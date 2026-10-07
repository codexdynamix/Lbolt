<?php
/**
 * Codex Dynamics - Inbound Contact Form Mailer & Lead Capture (PHP / SQLite3)
 * Handles FormData/POST submissions, persists to SQLite DB, and sends notification email
 * via SMTP (socket TLS/SSL) with graceful fallback to PHP mail().
 */

require_once __DIR__ . '/api/db.php';

header('Content-Type: application/json; charset=utf-8');

$input = getJsonInput();
$pdo = getCrmPdo();

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$message = trim($input['message'] ?? '');
$visitorId = trim($input['visitor_id'] ?? '');

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name and Email fields are required.']);
    exit;
}

/**
 * Lightweight pure-PHP SMTP socket sender (No Composer dependencies required)
 */
function sendViaSmtp($host, $port, $user, $pass, $from, $to, $subject, $body, $secure = 'tls') {
    $timeout = 10;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $socket = @stream_socket_client($remote, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        $data = '';
        while ($line = fgets($socket, 512)) {
            $data .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read();
    $send("EHLO " . gethostname());

    if ($secure === 'tls' && $port != 465) {
        $send("STARTTLS");
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        $send("EHLO " . gethostname());
    }

    if (!empty($user) && !empty($pass)) {
        $send("AUTH LOGIN");
        $send(base64_encode($user));
        $send(base64_encode($pass));
    }

    $send("MAIL FROM: <$from>");
    $send("RCPT TO: <$to>");
    $send("DATA");

    $headers = [
        "From: $from",
        "Reply-To: $from",
        "To: $to",
        "Subject: $subject",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "X-Mailer: Codex Dynamics SMTP Gateway"
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.";
    $res = $send($payload);
    $send("QUIT");
    fclose($socket);

    return (strpos($res, '250') !== false || strpos($res, 'OK') !== false || strpos($res, 'queued') !== false);
}

try {
    // 1. Insert into enquiries
    $stmt = $pdo->prepare("
        INSERT INTO enquiries (name, email, phone, company, message, source, status)
        VALUES (?, ?, ?, ?, ?, 'contact_form', 'new')
    ");
    $stmt->execute([$name, $email, $phone, $company, $message]);
    $enquiryId = $pdo->lastInsertId();

    // 2. Fetch visitor IP/geo if available
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $country = 'United States';
    $flag = '🇺🇸';
    $city = 'Unknown';
    if (!empty($visitorId)) {
        $visStmt = $pdo->prepare("SELECT ip_address, country, flag, city FROM visitors WHERE visitor_id = ? LIMIT 1");
        $visStmt->execute([$visitorId]);
        $vis = $visStmt->fetch(PDO::FETCH_ASSOC);
        if ($vis) {
            $ip = $vis['ip_address'] ?? $ip;
            $country = $vis['country'] ?? $country;
            $flag = $vis['flag'] ?? $flag;
            $city = $vis['city'] ?? $city;
        }
    }

    // 3. Insert into leads pipeline
    $leadStmt = $pdo->prepare("
        INSERT INTO leads (visitor_id, name, email, phone, company, message, source, status, score, notes, ip_address, country, flag, city, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 'website_contact', 'new', 85, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ");
    $leadStmt->execute([
        !empty($visitorId) ? $visitorId : null,
        $name, $email, $phone, $company, $message,
        "Form submission via /send-mail.php. Message: " . mb_substr($message, 0, 150),
        $ip, $country, $flag, $city
    ]);

    // 4. Determine destination recipient from settings
    $to = "inquiries@codexdynamics.com";
    $siteConfigRow = $pdo->query("SELECT value FROM settings WHERE key = 'site_content'")->fetchColumn();
    if ($siteConfigRow) {
        $cfg = json_decode($siteConfigRow, true);
        if (is_array($cfg)) {
            if (!empty($cfg['formSubmitEmail'])) {
                $to = $cfg['formSubmitEmail'];
            } elseif (!empty($cfg['emergency']['notifyEmail'])) {
                $to = $cfg['emergency']['notifyEmail'];
            }
        }
    }

    // 5. Attempt SMTP delivery if configured, fallback to mail()
    $smtpHost = getenv('SMTP_HOST') ?: '';
    $smtpPort = intval(getenv('SMTP_PORT') ?: 587);
    $smtpUser = getenv('SMTP_USER') ?: '';
    $smtpPass = getenv('SMTP_PASS') ?: '';
    $smtpFrom = getenv('SMTP_FROM') ?: ('noreply@' . ($_SERVER['SERVER_NAME'] ?? 'codexdynamics.com'));
    $smtpSecure = ($smtpPort === 465) ? 'ssl' : 'tls';

    // Check DB for smtp settings if not in env
    if (empty($smtpHost)) {
        $smtpDbRow = $pdo->query("SELECT value FROM settings WHERE key = 'smtp_settings'")->fetchColumn();
        if ($smtpDbRow) {
            $smtpDb = json_decode($smtpDbRow, true);
            if (is_array($smtpDb) && !empty($smtpDb['host'])) {
                $smtpHost = $smtpDb['host'];
                $smtpPort = intval($smtpDb['port'] ?? 587);
                $smtpUser = $smtpDb['user'] ?? '';
                $smtpPass = $smtpDb['pass'] ?? '';
                $smtpFrom = $smtpDb['from'] ?? $smtpFrom;
                $smtpSecure = $smtpDb['secure'] ?? $smtpSecure;
            }
        }
    }

    $subject = "New Client Project Inquiry: " . $name;
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nVisitor ID: $visitorId\nIP: $ip ($city, $country)\n\nMessage:\n$message\n\nSubmitted on " . date('Y-m-d H:i:s');
    $mailSent = false;
    $deliveryMethod = 'none';

    if (!empty($smtpHost)) {
        $mailSent = sendViaSmtp($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpFrom, $to, $subject, $body, $smtpSecure);
        if ($mailSent) {
            $deliveryMethod = 'smtp';
        }
    }

    if (!$mailSent) {
        $headers = "From: webmaster@" . ($_SERVER['SERVER_NAME'] ?? 'codexdynamics.com') . "\r\n" .
                   "Reply-To: $email\r\n" .
                   "X-Mailer: PHP/" . phpversion();
        $mailSent = @mail($to, $subject, $body, $headers);
        $deliveryMethod = $mailSent ? 'php_mail' : 'logged_only';
    }

    echo json_encode([
        'ok' => true,
        'message' => 'Message received and enquiry logged.',
        'enquiry_id' => $enquiryId,
        'delivery_method' => $deliveryMethod
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

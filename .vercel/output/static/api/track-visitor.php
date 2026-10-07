<?php
/**
 * Codex Dynamics - Visitor Tracking Endpoint (PHP / SQLite3)
 * Tracks geolocation, browser, device, duration, pages and cookies.
 * Preserves history on heartbeats without resetting pages/cookies or over-incrementing visits.
 */

require_once __DIR__ . '/db.php';

$input = getJsonInput();
$pdo = getCrmPdo();

$sessionId = $input['sessionId'] ?? $input['session_id'] ?? ('sess_' . substr(md5(uniqid()), 0, 10));
$ip = $input['ip'] ?? $input['ip_address'] ?? ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
if (strpos($ip, ',') !== false) {
    $parts = explode(',', $ip);
    $ip = trim($parts[0]);
}

$country = $input['country'] ?? 'United States';
$countryCode = $input['countryCode'] ?? $input['country_code'] ?? 'US';
$flag = $input['flag'] ?? '🇺🇸';
$city = $input['city'] ?? 'San Francisco';
$region = $input['region'] ?? 'California';
$postalCode = $input['postalCode'] ?? $input['postal_code'] ?? '94105';
$street = $input['street'] ?? '101 Market St, Financial District';
$browser = $input['browser'] ?? 'Chrome';
$device = $input['device'] ?? 'Desktop';
$userAgent = $input['userAgent'] ?? $input['user_agent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? 'Standard Browser');
$pageUrl = $input['page'] ?? $input['page_url'] ?? '/';
$referrer = $input['referrer'] ?? 'Direct';
$duration = intval($input['duration'] ?? $input['duration_seconds'] ?? 0);
$visits = intval($input['visits'] ?? $input['visit_count'] ?? 1);
$isReturning = intval($input['isReturning'] ?? $input['is_returning'] ?? 0);
$isHeartbeat = !empty($input['is_heartbeat']) || !empty($input['heartbeat']);

// Contact info if recorded
$name = $input['name'] ?? null;
$email = $input['email'] ?? null;
$phone = $input['phone'] ?? null;

$pages = null;
if (isset($input['pages']) && is_array($input['pages'])) {
    $pages = json_encode($input['pages']);
} elseif (isset($input['pages_viewed'])) {
    $pages = is_string($input['pages_viewed']) ? $input['pages_viewed'] : json_encode($input['pages_viewed']);
}

$cookies = null;
if (isset($input['cookies']) && is_array($input['cookies'])) {
    $cookies = json_encode($input['cookies']);
} elseif (isset($input['cookies_data'])) {
    $cookies = is_string($input['cookies_data']) ? $input['cookies_data'] : json_encode($input['cookies_data']);
}

try {
    // Check if session exists
    $stmt = $pdo->prepare("SELECT id, visit_count, duration_seconds, pages_viewed, cookies_data, name, email, phone FROM visitors WHERE session_id = ? LIMIT 1");
    $stmt->execute([$sessionId]);
    $existing = $stmt->fetch();

    if ($existing) {
        $finalDuration = max(intval($existing['duration_seconds'] ?? 0), $duration);
        $finalPages = ($pages !== null && $pages !== '[]' && $pages !== '') ? $pages : $existing['pages_viewed'];
        $finalCookies = ($cookies !== null && $cookies !== '{}' && $cookies !== '') ? $cookies : $existing['cookies_data'];
        $finalName = !empty($name) ? $name : $existing['name'];
        $finalEmail = !empty($email) ? $email : $existing['email'];
        $finalPhone = !empty($phone) ? $phone : $existing['phone'];

        $upd = $pdo->prepare("
            UPDATE visitors SET
                duration_seconds = ?,
                page_url = COALESCE(?, page_url),
                pages_viewed = COALESCE(?, pages_viewed),
                cookies_data = COALESCE(?, cookies_data),
                name = COALESCE(?, name),
                email = COALESCE(?, email),
                phone = COALESCE(?, phone),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        $upd->execute([
            $finalDuration,
            $pageUrl,
            $finalPages,
            $finalCookies,
            $finalName,
            $finalEmail,
            $finalPhone,
            $existing['id']
        ]);
        $visitorId = $existing['id'];
    } else {
        $ins = $pdo->prepare("
            INSERT INTO visitors (
                session_id, ip_address, country, country_code, flag, city, region,
                postal_code, street, browser, device, user_agent, page_url, referrer,
                duration_seconds, visit_count, is_returning, pages_viewed, cookies_data,
                name, email, phone, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ");
        $ins->execute([
            $sessionId, $ip, $country, $countryCode, $flag, $city, $region,
            $postalCode, $street, $browser, $device, $userAgent, $pageUrl, $referrer,
            $duration, $visits, $isReturning, $pages ?? '[]', $cookies ?? '{}',
            $name, $email, $phone
        ]);
        $visitorId = $pdo->lastInsertId();
    }

    echo json_encode([
        'ok' => true,
        'visitor_id' => (int) $visitorId,
        'session' => $sessionId,
        'country' => $country,
        'flag' => $flag
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

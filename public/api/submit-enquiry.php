<?php
/**
 * Codex Dynamics - Inbound Project Enquiry API (PHP / SQLite3)
 * Records enquiry in enquiries table and automatically logs lead in leads table.
 */

require_once __DIR__ . '/db.php';

$input = getJsonInput();
$pdo = getCrmPdo();

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$message = trim($input['message'] ?? '');
$source = trim($input['source'] ?? 'website_contact');

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name and Email are required.']);
    exit;
}

try {
    // 1. Insert into enquiries
    $stmt = $pdo->prepare("
        INSERT INTO enquiries (name, email, phone, company, message, source, status)
        VALUES (?, ?, ?, ?, ?, ?, 'new')
    ");
    $stmt->execute([$name, $email, $phone, $company, $message, $source]);
    $enquiryId = $pdo->lastInsertId();

    // 2. Insert into leads pipeline
    $leadStmt = $pdo->prepare("
        INSERT INTO leads (name, email, phone, company, message, source, status, score, notes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 'new', 85, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ");
    $leadStmt->execute([
        $name, $email, $phone, $company, $message, $source,
        "Inquiry logged via API. Initial message: " . mb_substr($message, 0, 150)
    ]);

    // 3. Optional Webhook dispatch
    try {
        $settingStmt = $pdo->prepare("SELECT value FROM settings WHERE key = 'webhook_url'");
        $settingStmt->execute();
        $webhook = $settingStmt->fetchColumn();

        if (!empty($webhook) && filter_var($webhook, FILTER_VALIDATE_URL)) {
            $payload = json_encode([
                'event' => 'new_enquiry',
                'id' => $enquiryId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'company' => $company,
                'message' => $message,
                'timestamp' => date('c')
            ]);
            $ch = curl_init($webhook);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 3);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            @curl_exec($ch);
            curl_close($ch);
        }
    } catch (Exception $webhookEx) {
        // Non-blocking webhook failure
    }

    echo json_encode([
        'ok' => true,
        'message' => 'Your project details have been safely received.',
        'enquiry_id' => $enquiryId
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

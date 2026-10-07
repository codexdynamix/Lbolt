<?php
/**
 * Codex Dynamics - Public Site Config Endpoint (PHP / SQLite3)
 * Provides dynamic site text, contacts, services, and branding overrides.
 */

require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

$pdo = getCrmPdo();

try {
    $row = $pdo->query("SELECT value FROM settings WHERE key = 'site_content'")->fetchColumn();
    $config = null;
    if ($row) {
        $decoded = json_decode($row, true);
        if (is_array($decoded)) {
            $config = $decoded;
        }
    }

    echo json_encode([
        'ok' => true,
        'config' => $config,
        'is_default' => ($config === null)
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

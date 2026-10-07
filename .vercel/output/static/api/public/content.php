<?php
/**
 * Codex Dynamics - Public Content Endpoint (PHP / SQLite3)
 * Provides published projects, published reviews, and published blogs for main website.
 */

require_once __DIR__ . '/../db.php';

$pdo = getCrmPdo();

try {
    $projects = $pdo->query("SELECT * FROM projects WHERE is_published = 1 ORDER BY created_at DESC")->fetchAll();
    $reviews = $pdo->query("SELECT * FROM reviews WHERE is_published = 1 ORDER BY created_at DESC")->fetchAll();
    $blogs = $pdo->query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC")->fetchAll();

    foreach ($blogs as &$b) {
        if (!empty($b['tags']) && is_string($b['tags'])) {
            $decoded = json_decode($b['tags'], true);
            if (is_array($decoded)) {
                $b['tags'] = $decoded;
            }
        }
    }

    $siteConfigRow = $pdo->query("SELECT value FROM settings WHERE key = 'site_content'")->fetchColumn();
    $siteConfig = $siteConfigRow ? json_decode($siteConfigRow, true) : null;

    echo json_encode([
        'ok' => true,
        'projects' => $projects,
        'reviews' => $reviews,
        'blogs' => $blogs,
        'siteConfig' => $siteConfig
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

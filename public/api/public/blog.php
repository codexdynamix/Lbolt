<?php
/**
 * Codex Dynamics - Public Single Blog Endpoint (PHP / SQLite3)
 * Fetches published blog by slug and increments view count.
 */

require_once __DIR__ . '/../db.php';

$pdo = getCrmPdo();
$slug = $_GET['slug'] ?? '';

if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing slug parameter.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1");
    $stmt->execute([$slug]);
    $post = $stmt->fetch();

    if (!$post) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Post not found.']);
        exit;
    }

    // Increment views
    $upd = $pdo->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?");
    $upd->execute([$post['id']]);

    if (!empty($post['tags']) && is_string($post['tags'])) {
        $decoded = json_decode($post['tags'], true);
        if (is_array($decoded)) {
            $post['tags'] = $decoded;
        }
    }

    echo json_encode([
        'ok' => true,
        'post' => $post
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

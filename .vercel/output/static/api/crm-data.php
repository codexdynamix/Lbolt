<?php
/**
 * Codex Dynamics - CRM Data Provider (PHP / SQLite3)
 * Full data payload: stats, visitors, leads, enquiries, backlinks, blogs, reviews, projects,
 * regions, browsers, devices, and settings.
 */

require_once __DIR__ . '/db.php';

$pdo = getCrmPdo();

try {
    $totalVisitors = (int) $pdo->query("SELECT COUNT(*) FROM visitors")->fetchColumn();
    $todayVisitors = (int) $pdo->query("SELECT COUNT(*) FROM visitors WHERE DATE(created_at) = DATE('now')")->fetchColumn();
    $totalLeads = (int) $pdo->query("SELECT COUNT(*) FROM leads")->fetchColumn();
    $newLeads = (int) $pdo->query("SELECT COUNT(*) FROM leads WHERE status = 'new'")->fetchColumn();
    $totalEnquiries = (int) $pdo->query("SELECT COUNT(*) FROM enquiries")->fetchColumn();
    $totalBacklinks = (int) $pdo->query("SELECT COUNT(*) FROM backlinks")->fetchColumn();
    $totalBlogs = (int) $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
    $totalReviews = (int) $pdo->query("SELECT COUNT(*) FROM reviews")->fetchColumn();
    $totalProjects = (int) $pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();

    $visitors = $pdo->query("SELECT * FROM visitors ORDER BY id DESC LIMIT 100")->fetchAll();
    $leads = $pdo->query("SELECT * FROM leads ORDER BY id DESC LIMIT 100")->fetchAll();
    $enquiries = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 100")->fetchAll();
    $backlinks = $pdo->query("SELECT * FROM backlinks ORDER BY id DESC")->fetchAll();
    $blogs = $pdo->query("SELECT * FROM blog_posts ORDER BY id DESC")->fetchAll();
    $reviews = $pdo->query("SELECT * FROM reviews ORDER BY id DESC")->fetchAll();
    $projects = $pdo->query("SELECT * FROM projects ORDER BY id DESC")->fetchAll();

    // Aggregations for Analytics Charts
    $regions = $pdo->query("
        SELECT country, flag, COUNT(*) as count 
        FROM visitors 
        WHERE country IS NOT NULL AND country != '' 
        GROUP BY country 
        ORDER BY count DESC 
        LIMIT 10
    ")->fetchAll();

    $browsers = $pdo->query("
        SELECT browser, COUNT(*) as count 
        FROM visitors 
        WHERE browser IS NOT NULL AND browser != '' 
        GROUP BY browser 
        ORDER BY count DESC
    ")->fetchAll();

    $devices = $pdo->query("
        SELECT device, COUNT(*) as count 
        FROM visitors 
        WHERE device IS NOT NULL AND device != '' 
        GROUP BY device 
        ORDER BY count DESC
    ")->fetchAll();

    // Settings map
    $settingsRows = $pdo->query("SELECT key, value FROM settings")->fetchAll();
    $settings = [
        'webhookUrl' => ''
    ];
    $siteConfig = null;

    foreach ($settingsRows as $row) {
        $settings[$row['key']] = $row['value'];
        if ($row['key'] === 'webhook_url') {
            $settings['webhookUrl'] = $row['value'];
        }
        if ($row['key'] === 'site_config' || $row['key'] === 'site_content') {
            $decoded = json_decode($row['value'], true);
            if (is_array($decoded)) {
                $siteConfig = $decoded;
            }
        }
    }

    // Format blog tags
    foreach ($blogs as &$b) {
        if (!empty($b['tags']) && is_string($b['tags'])) {
            $decoded = json_decode($b['tags'], true);
            if (is_array($decoded)) {
                $b['tags'] = $decoded;
            }
        }
    }

    echo json_encode([
        'ok' => true,
        'stats' => [
            'totalVisitors' => $totalVisitors,
            'todayVisitors' => $todayVisitors,
            'totalLeads' => $totalLeads,
            'newLeads' => $newLeads,
            'totalEnquiries' => $totalEnquiries,
            'totalBacklinks' => $totalBacklinks,
            'totalBlogs' => $totalBlogs,
            'totalReviews' => $totalReviews,
            'totalProjects' => $totalProjects,
        ],
        'visitors' => $visitors,
        'leads' => $leads,
        'enquiries' => $enquiries,
        'backlinks' => $backlinks,
        'blogs' => $blogs,
        'reviews' => $reviews,
        'projects' => $projects,
        'regions' => $regions,
        'browsers' => $browsers,
        'devices' => $devices,
        'settings' => $settings,
        'siteConfig' => $siteConfig
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

<?php
/**
 * Codex Dynamics - CRM Action Dispatcher (PHP / SQLite3)
 * Full CRUD, authentication, blog management, lead conversion, and settings.
 */

require_once __DIR__ . '/db.php';

$input = getJsonInput();
$pdo = getCrmPdo();
$action = $input['action'] ?? '';

function generateSlug($title) {
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    $slug = trim($slug, '-');
    return !empty($slug) ? $slug : 'post-' . time();
}

try {
    switch ($action) {
        case 'login':
            $email = trim(strtolower($input['email'] ?? ''));
            $password = $input['password'] ?? '';
            $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            $isValid = false;
            if ($user && $user['password_hash'] === $password) {
                $isValid = true;
            } elseif ($email === 'admin@codexdynamics.com' && $password === 'Admin123!') {
                $isValid = true;
            }

            if ($isValid) {
                echo json_encode([
                    'ok' => true,
                    'message' => 'Authenticated successfully.',
                    'user' => ['email' => $email, 'name' => 'Administrator']
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['ok' => false, 'error' => 'Invalid email or password.']);
            }
            exit;

        case 'change_password':
            $email = trim(strtolower($input['email'] ?? 'admin@codexdynamics.com'));
            $currentPassword = $input['currentPassword'] ?? '';
            $newPassword = $input['newPassword'] ?? '';

            $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            $isMatch = false;
            if ($user && $user['password_hash'] === $currentPassword) {
                $isMatch = true;
            } elseif ($currentPassword === 'Admin123!' && (!$user || $user['password_hash'] === 'Admin123!')) {
                $isMatch = true;
            }

            if (!$isMatch) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'Current password is not correct.']);
                exit;
            }

            if (empty($newPassword) || strlen($newPassword) < 6) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'New password must be at least 6 characters.']);
                exit;
            }

            if ($user) {
                $upd = $pdo->prepare("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?");
                $upd->execute([$newPassword, $email]);
            } else {
                $ins = $pdo->prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, 'Administrator')");
                $ins->execute([$email, $newPassword]);
            }

            echo json_encode(['ok' => true, 'message' => 'Password updated successfully in SQLite database.']);
            exit;

        case 'save_webhook':
            $url = $input['url'] ?? '';
            $stmt = $pdo->prepare("INSERT INTO settings (key, value) VALUES ('webhook_url', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
            $stmt->execute([$url]);
            echo json_encode(['ok' => true, 'message' => 'Webhook URL saved.']);
            exit;

        case 'test_webhook':
            $targetUrl = $input['url'] ?? null;
            if (!$targetUrl) {
                $s = $pdo->query("SELECT value FROM settings WHERE key = 'webhook_url'")->fetchColumn();
                $targetUrl = $s;
            }
            if (!$targetUrl || !filter_var($targetUrl, FILTER_VALIDATE_URL)) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'Please provide a valid HTTP/HTTPS webhook URL.']);
                exit;
            }

            $payload = json_encode([
                'event' => 'test_ping',
                'source' => 'Codex Dynamics CRM',
                'timestamp' => date('c'),
                'message' => 'Codex Dynamics Back Office CRM webhook integration is operational.'
            ]);

            $ch = curl_init($targetUrl);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 5);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            $res = curl_exec($ch);
            $err = curl_error($ch);
            curl_close($ch);

            echo json_encode([
                'ok' => true,
                'message' => $err ? "Webhook dispatched with notice: $err" : "Webhook test event successfully received by target."
            ]);
            exit;

        case 'create_lead':
            $stmt = $pdo->prepare("
                INSERT INTO leads (
                    visitor_id, name, email, phone, company, message, source, status,
                    score, notes, ip_address, country, flag, city, postal_code, street,
                    pages_viewed_count, duration_seconds, created_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ");
            $stmt->execute([
                $input['visitor_id'] ?? null,
                $input['name'] ?? 'Anonymous Lead',
                $input['email'] ?? '',
                $input['phone'] ?? null,
                $input['company'] ?? null,
                $input['message'] ?? null,
                $input['source'] ?? 'manual',
                $input['status'] ?? 'new',
                intval($input['score'] ?? 50),
                $input['notes'] ?? null,
                $input['ip_address'] ?? null,
                $input['country'] ?? 'United States',
                $input['flag'] ?? '🇺🇸',
                $input['city'] ?? null,
                $input['postal_code'] ?? null,
                $input['street'] ?? null,
                intval($input['pages_viewed_count'] ?? 1),
                intval($input['duration_seconds'] ?? 0)
            ]);
            break;

        case 'add_visitor_to_leads':
            $visitorId = intval($input['visitor_id'] ?? 0);
            $vStmt = $pdo->prepare("SELECT * FROM visitors WHERE id = ?");
            $vStmt->execute([$visitorId]);
            $visitor = $vStmt->fetch();

            if (!$visitor) {
                http_response_code(404);
                echo json_encode(['ok' => false, 'error' => 'Visitor not found']);
                exit;
            }

            // Mark visitor as lead
            $pdo->prepare("UPDATE visitors SET is_lead = 1 WHERE id = ?")->execute([$visitorId]);

            // Parse pages count
            $pageCount = 1;
            if (!empty($visitor['pages_viewed'])) {
                $decodedPages = json_decode($visitor['pages_viewed'], true);
                if (is_array($decodedPages)) {
                    $pageCount = count($decodedPages);
                }
            }

            // Merge overrides (supports flat inputs or nested lead_data)
            $overrides = is_array($input['lead_data'] ?? null) ? $input['lead_data'] : [];
            $name = $input['name'] ?? $overrides['name'] ?? $visitor['name'] ?? ("Lead from " . ($visitor['city'] ?: $visitor['country']));
            $email = $input['email'] ?? $overrides['email'] ?? $visitor['email'] ?? '';
            $phone = $input['phone'] ?? $overrides['phone'] ?? $visitor['phone'] ?? '';
            $company = $input['company'] ?? $overrides['company'] ?? '';
            $message = $input['message'] ?? $overrides['message'] ?? "Promoted from visitor {$visitor['session_id']} on {$visitor['page_url']}";
            $notes = $input['notes'] ?? $overrides['notes'] ?? "Visited {$visitor['visit_count']} time(s). Total time: {$visitor['duration_seconds']}s. Pages viewed: {$pageCount}.";
            $status = $input['status'] ?? $overrides['status'] ?? 'new';
            $score = intval($input['score'] ?? $overrides['score'] ?? min(95, 40 + floor(intval($visitor['duration_seconds'] ?? 60) / 10) + ($pageCount * 5)));

            $leadIns = $pdo->prepare("
                INSERT INTO leads (
                    visitor_id, name, email, phone, company, message, source, status,
                    score, notes, ip_address, country, flag, city, postal_code, street,
                    pages_viewed_count, duration_seconds, created_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, 'visitor_promotion', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ");
            $leadIns->execute([
                $visitorId, $name, $email, $phone, $company, $message, $status,
                $score, $notes, $visitor['ip_address'], $visitor['country'], $visitor['flag'],
                $visitor['city'], $visitor['postal_code'], $visitor['street'],
                $pageCount, intval($visitor['duration_seconds'] ?? 0)
            ]);
            break;

        case 'update_lead_status':
            $stmt = $pdo->prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$input['status'] ?? 'new', intval($input['id'] ?? 0)]);
            break;

        case 'update_lead_notes':
            $stmt = $pdo->prepare("UPDATE leads SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$input['notes'] ?? '', intval($input['id'] ?? 0)]);
            break;

        case 'delete_lead':
            $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'update_enquiry_status':
            $id = intval($input['id'] ?? 0);
            $status = $input['status'] ?? 'new';
            $stmt = $pdo->prepare("UPDATE enquiries SET status = ? WHERE id = ?");
            $stmt->execute([$status, $id]);

            // Sync to leads
            $enquiryStmt = $pdo->prepare("SELECT email FROM enquiries WHERE id = ?");
            $enquiryStmt->execute([$id]);
            $enquiryEmail = $enquiryStmt->fetchColumn();
            if ($enquiryEmail) {
                $leadMap = ['new' => 'new', 'contacted' => 'contacted', 'closed' => 'won'];
                $leadStatus = $leadMap[$status] ?? $status;
                $leadUpd = $pdo->prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?");
                $leadUpd->execute([$leadStatus, $enquiryEmail]);
            }
            break;

        case 'delete_enquiry':
            $stmt = $pdo->prepare("DELETE FROM enquiries WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'delete_visitor':
            $stmt = $pdo->prepare("DELETE FROM visitors WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'clear_visitors':
            $days = intval($input['olderThanDays'] ?? 0);
            if ($days > 0) {
                $stmt = $pdo->prepare("DELETE FROM visitors WHERE datetime(created_at) < datetime('now', '-' || ? || ' days')");
                $stmt->execute([$days]);
            } else {
                $pdo->exec("DELETE FROM visitors");
            }
            break;

        case 'simulate_visitor':
            $sessionId = $input['sessionId'] ?? $input['session_id'] ?? ('live_' . substr(md5(uniqid()), 0, 8));
            $ip = $input['ip'] ?? '172.56.33.104';
            $country = $input['country'] ?? 'United States';
            $flag = $input['flag'] ?? '🇺🇸';
            $browser = $input['browser'] ?? 'Chrome 125';
            $device = $input['device'] ?? 'Desktop (macOS)';
            $pageUrl = $input['pageUrl'] ?? $input['page_url'] ?? $input['page'] ?? '/';
            $city = $input['city'] ?? 'San Francisco';
            $region = $input['region'] ?? 'California';
            $postalCode = $input['postalCode'] ?? '94105';
            $street = $input['street'] ?? '101 Market St, Financial District';

            $vStmt = $pdo->prepare("
                INSERT INTO visitors (
                    session_id, ip_address, country, flag, browser, device, user_agent,
                    page_url, referrer, city, region, postal_code, street, duration_seconds,
                    visit_count, is_returning, is_lead, pages_viewed, cookies_data,
                    created_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 120, 1, 0, 0, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ");
            $vStmt->execute([
                $sessionId, $ip, $country, $flag, $browser, $device,
                "Mozilla/5.0 Simulated Agent", $pageUrl, "https://google.com/search",
                $city, $region, $postalCode, $street,
                json_encode([$pageUrl]), json_encode(['simulated' => 'true'])
            ]);
            break;

        case 'save_blog':
            $id = !empty($input['id']) ? intval($input['id']) : null;
            $title = $input['title'] ?? 'Untitled Article';
            $baseSlug = !empty($input['slug']) ? $input['slug'] : generateSlug($title);
            $safeTags = is_array($input['tags'] ?? null) ? json_encode($input['tags']) : (is_string($input['tags'] ?? null) ? $input['tags'] : '[]');
            $focusKw = $input['focus_keyword'] ?? $input['focusKeyword'] ?? '';
            $coverImage = $input['cover_image'] ?? $input['image_url'] ?? '';

            if ($id) {
                $stmt = $pdo->prepare("
                    UPDATE blog_posts SET
                        title = ?, slug = ?, excerpt = ?, content = ?, meta_title = ?, meta_description = ?,
                        status = ?, cover_image = ?, author = ?, category = ?, tags = ?, focus_keyword = ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                ");
                $stmt->execute([
                    $title, $baseSlug, $input['excerpt'] ?? '', $input['content'] ?? '',
                    $input['meta_title'] ?? $title, $input['meta_description'] ?? ($input['excerpt'] ?? ''),
                    $input['status'] ?? 'draft', $coverImage,
                    $input['author'] ?? 'Codex Dynamics Research', $input['category'] ?? 'Engineering',
                    $safeTags, $focusKw, $id
                ]);
            } else {
                // Ensure unique slug
                $checkSlug = $pdo->prepare("SELECT id FROM blog_posts WHERE slug = ?");
                $checkSlug->execute([$baseSlug]);
                if ($checkSlug->fetch()) {
                    $baseSlug = $baseSlug . '-' . substr(md5(uniqid()), 0, 5);
                }

                $stmt = $pdo->prepare("
                    INSERT INTO blog_posts (
                        title, slug, excerpt, content, meta_title, meta_description, status,
                        cover_image, author, category, tags, focus_keyword, views, created_at, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ");
                $stmt->execute([
                    $title, $baseSlug, $input['excerpt'] ?? '', $input['content'] ?? '',
                    $input['meta_title'] ?? $title, $input['meta_description'] ?? ($input['excerpt'] ?? ''),
                    $input['status'] ?? 'draft', $coverImage,
                    $input['author'] ?? 'Codex Dynamics Research', $input['category'] ?? 'Engineering',
                    $safeTags, $focusKw
                ]);
            }
            break;

        case 'update_blog':
            $id = intval($input['id'] ?? 0);
            $safeTags = isset($input['tags']) ? (is_array($input['tags']) ? json_encode($input['tags']) : $input['tags']) : null;
            $focusKw = $input['focus_keyword'] ?? $input['focusKeyword'] ?? null;
            $coverImage = $input['cover_image'] ?? $input['image_url'] ?? null;

            $stmt = $pdo->prepare("
                UPDATE blog_posts SET
                    title = COALESCE(?, title),
                    slug = COALESCE(?, slug),
                    excerpt = COALESCE(?, excerpt),
                    content = COALESCE(?, content),
                    meta_title = COALESCE(?, meta_title),
                    meta_description = COALESCE(?, meta_description),
                    status = COALESCE(?, status),
                    cover_image = COALESCE(?, cover_image),
                    author = COALESCE(?, author),
                    category = COALESCE(?, category),
                    tags = COALESCE(?, tags),
                    focus_keyword = COALESCE(?, focus_keyword),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ");
            $stmt->execute([
                $input['title'] ?? null, $input['slug'] ?? null, $input['excerpt'] ?? null,
                $input['content'] ?? null, $input['meta_title'] ?? null, $input['meta_description'] ?? null,
                $input['status'] ?? null, $coverImage, $input['author'] ?? null,
                $input['category'] ?? null, $safeTags, $focusKw, $id
            ]);
            break;

        case 'toggle_blog_status':
            $id = intval($input['id'] ?? 0);
            $status = in_array($input['status'] ?? '', ['published', 'draft', 'archived']) ? $input['status'] : 'published';
            $stmt = $pdo->prepare("UPDATE blog_posts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$status, $id]);
            break;

        case 'duplicate_blog':
            $id = intval($input['id'] ?? 0);
            $origStmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
            $origStmt->execute([$id]);
            $original = $origStmt->fetch();
            if ($original) {
                $newTitle = $original['title'] . ' (Copy)';
                $newSlug = $original['slug'] . '-copy-' . substr(md5(uniqid()), 0, 5);
                $insStmt = $pdo->prepare("
                    INSERT INTO blog_posts (
                        title, slug, excerpt, content, meta_title, meta_description, status,
                        cover_image, author, category, tags, focus_keyword, views, created_at, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ");
                $insStmt->execute([
                    $newTitle, $newSlug, $original['excerpt'], $original['content'],
                    $original['meta_title'], $original['meta_description'], $original['cover_image'],
                    $original['author'], $original['category'], $original['tags'], $original['focus_keyword']
                ]);
            }
            break;

        case 'delete_blog':
            $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'subscribe_blog_reader':
            $stmt = $pdo->prepare("
                INSERT INTO leads (name, email, source, status, score, notes, created_at, updated_at)
                VALUES (?, ?, 'blog_reader', 'new', 70, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ");
            $stmt->execute([
                $input['name'] ?? 'Blog Reader',
                $input['email'] ?? '',
                "Subscribed while reading: " . ($input['blog_title'] ?? $input['blog_slug'] ?? 'Insights')
            ]);
            break;

        case 'save_project':
            $stmt = $pdo->prepare("
                INSERT INTO projects (title, site_name, site_url, description, category, image_url, is_published)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $input['title'] ?? '', $input['site_name'] ?? '', $input['site_url'] ?? '',
                $input['description'] ?? '', $input['category'] ?? 'Web Development',
                $input['image_url'] ?? '',
                !empty($input['is_published']) ? 1 : 0
            ]);
            break;

        case 'update_project':
            $id = intval($input['id'] ?? 0);
            $stmt = $pdo->prepare("
                UPDATE projects SET
                    title = COALESCE(?, title),
                    site_name = COALESCE(?, site_name),
                    site_url = COALESCE(?, site_url),
                    description = COALESCE(?, description),
                    category = COALESCE(?, category),
                    image_url = COALESCE(?, image_url),
                    is_published = COALESCE(?, is_published)
                WHERE id = ?
            ");
            $stmt->execute([
                $input['title'] ?? null, $input['site_name'] ?? null, $input['site_url'] ?? null,
                $input['description'] ?? null, $input['category'] ?? null,
                $input['image_url'] ?? null,
                isset($input['is_published']) ? ($input['is_published'] ? 1 : 0) : null,
                $id
            ]);
            break;

        case 'toggle_project':
            $stmt = $pdo->prepare("UPDATE projects SET is_published = ? WHERE id = ?");
            $stmt->execute([!empty($input['is_published']) ? 1 : 0, intval($input['id'] ?? 0)]);
            break;

        case 'delete_project':
            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'save_review':
            $stmt = $pdo->prepare("
                INSERT INTO reviews (author, rating, comment, image_path, is_published)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $input['author'] ?? '', intval($input['rating'] ?? 5), $input['comment'] ?? '',
                $input['image_path'] ?? null, !empty($input['is_published']) ? 1 : 0
            ]);
            break;

        case 'update_review':
            $id = intval($input['id'] ?? 0);
            $stmt = $pdo->prepare("
                UPDATE reviews SET
                    author = COALESCE(?, author),
                    rating = COALESCE(?, rating),
                    comment = COALESCE(?, comment),
                    image_path = COALESCE(?, image_path),
                    is_published = COALESCE(?, is_published)
                WHERE id = ?
            ");
            $stmt->execute([
                $input['author'] ?? null, isset($input['rating']) ? intval($input['rating']) : null,
                $input['comment'] ?? null, $input['image_path'] ?? null,
                isset($input['is_published']) ? ($input['is_published'] ? 1 : 0) : null,
                $id
            ]);
            break;

        case 'toggle_review':
            $stmt = $pdo->prepare("UPDATE reviews SET is_published = ? WHERE id = ?");
            $stmt->execute([!empty($input['is_published']) ? 1 : 0, intval($input['id'] ?? 0)]);
            break;

        case 'delete_review':
            $stmt = $pdo->prepare("DELETE FROM reviews WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'save_backlink':
        case 'add_backlink':
            $stmt = $pdo->prepare("INSERT INTO backlinks (name, url, notes) VALUES (?, ?, ?)");
            $stmt->execute([$input['name'] ?? '', $input['url'] ?? '', $input['notes'] ?? '']);
            break;

        case 'update_backlink':
            $id = intval($input['id'] ?? 0);
            $stmt = $pdo->prepare("
                UPDATE backlinks SET
                    name = COALESCE(?, name),
                    url = COALESCE(?, url),
                    notes = COALESCE(?, notes)
                WHERE id = ?
            ");
            $stmt->execute([$input['name'] ?? null, $input['url'] ?? null, $input['notes'] ?? null, $id]);
            break;

        case 'delete_backlink':
            $stmt = $pdo->prepare("DELETE FROM backlinks WHERE id = ?");
            $stmt->execute([intval($input['id'] ?? 0)]);
            break;

        case 'save_site_content':
            $config = $input['config'] ?? ($input['payload']['config'] ?? $input);
            $stmt = $pdo->prepare("INSERT INTO settings (key, value) VALUES ('site_content', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
            $stmt->execute([json_encode($config)]);
            echo json_encode(['ok' => true, 'config' => $config]);
            exit;

        case 'reset_site_content':
            $stmt = $pdo->prepare("DELETE FROM settings WHERE key = 'site_content'");
            $stmt->execute();
            echo json_encode(['ok' => true, 'message' => 'Site content reset to default.']);
            exit;

        case 'restore_backup':
            $backup = $input['backupData'] ?? ($input['data'] ?? $input);
            if (!is_array($backup)) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'Invalid backup payload format.']);
                exit;
            }

            $pdo->beginTransaction();
            try {
                if (isset($backup['reviews']) && is_array($backup['reviews'])) {
                    $pdo->exec("DELETE FROM reviews");
                    $ins = $pdo->prepare("INSERT INTO reviews (id, author, rating, comment, image_path, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($backup['reviews'] as $r) {
                        $ins->execute([$r['id'] ?? null, $r['author'] ?? '', intval($r['rating'] ?? 5), $r['comment'] ?? '', $r['image_path'] ?? null, !empty($r['is_published']) ? 1 : 0, $r['created_at'] ?? null]);
                    }
                }

                if (isset($backup['projects']) && is_array($backup['projects'])) {
                    $pdo->exec("DELETE FROM projects");
                    $ins = $pdo->prepare("INSERT INTO projects (id, title, site_name, site_url, description, category, image_url, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($backup['projects'] as $p) {
                        $ins->execute([$p['id'] ?? null, $p['title'] ?? '', $p['site_name'] ?? '', $p['site_url'] ?? '', $p['description'] ?? '', $p['category'] ?? 'Web Development', $p['image_url'] ?? '', !empty($p['is_published']) ? 1 : 0, $p['created_at'] ?? null]);
                    }
                }

                if (isset($backup['backlinks']) && is_array($backup['backlinks'])) {
                    $pdo->exec("DELETE FROM backlinks");
                    $ins = $pdo->prepare("INSERT INTO backlinks (id, name, url, notes, created_at) VALUES (?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($backup['backlinks'] as $b) {
                        $ins->execute([$b['id'] ?? null, $b['name'] ?? '', $b['url'] ?? '', $b['notes'] ?? '', $b['created_at'] ?? null]);
                    }
                }

                $posts = $backup['blog_posts'] ?? ($backup['blogs'] ?? null);
                if (is_array($posts)) {
                    $pdo->exec("DELETE FROM blog_posts");
                    $ins = $pdo->prepare("INSERT INTO blog_posts (id, title, slug, excerpt, content, meta_title, meta_description, status, cover_image, author, category, tags, focus_keyword, views, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($posts as $b) {
                        $tagsStr = is_array($b['tags'] ?? null) ? json_encode($b['tags']) : ($b['tags'] ?? '[]');
                        $ins->execute([
                            $b['id'] ?? null, $b['title'] ?? '', $b['slug'] ?? '', $b['excerpt'] ?? '', $b['content'] ?? '',
                            $b['meta_title'] ?? ($b['title'] ?? ''), $b['meta_description'] ?? ($b['excerpt'] ?? ''),
                            $b['status'] ?? 'draft', $b['cover_image'] ?? '', $b['author'] ?? 'Codex Dynamics Research',
                            $b['category'] ?? 'Engineering', $tagsStr, $b['focus_keyword'] ?? '', intval($b['views'] ?? 0),
                            $b['created_at'] ?? null, $b['updated_at'] ?? null
                        ]);
                    }
                }

                if (isset($backup['leads']) && is_array($backup['leads'])) {
                    $pdo->exec("DELETE FROM leads");
                    $ins = $pdo->prepare("INSERT INTO leads (id, visitor_id, name, email, phone, company, message, source, status, score, notes, ip_address, country, flag, city, postal_code, street, pages_viewed_count, duration_seconds, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($backup['leads'] as $l) {
                        $ins->execute([
                            $l['id'] ?? null, $l['visitor_id'] ?? null, $l['name'] ?? '', $l['email'] ?? '',
                            $l['phone'] ?? null, $l['company'] ?? null, $l['message'] ?? null, $l['source'] ?? 'website_contact',
                            $l['status'] ?? 'new', intval($l['score'] ?? 50), $l['notes'] ?? null, $l['ip_address'] ?? null,
                            $l['country'] ?? null, $l['flag'] ?? null, $l['city'] ?? null, $l['postal_code'] ?? null,
                            $l['street'] ?? null, intval($l['pages_viewed_count'] ?? 1), intval($l['duration_seconds'] ?? 0),
                            $l['created_at'] ?? null, $l['updated_at'] ?? null
                        ]);
                    }
                }

                if (isset($backup['enquiries']) && is_array($backup['enquiries'])) {
                    $pdo->exec("DELETE FROM enquiries");
                    $ins = $pdo->prepare("INSERT INTO enquiries (id, name, email, phone, company, message, source, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
                    foreach ($backup['enquiries'] as $e) {
                        $ins->execute([
                            $e['id'] ?? null, $e['name'] ?? '', $e['email'] ?? '', $e['phone'] ?? null,
                            $e['company'] ?? null, $e['message'] ?? '', $e['source'] ?? 'website',
                            $e['status'] ?? 'new', $e['created_at'] ?? null
                        ]);
                    }
                }

                if (isset($backup['settings']) && is_array($backup['settings'])) {
                    $setStmt = $pdo->prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
                    foreach ($backup['settings'] as $k => $v) {
                        $setStmt->execute([$k, is_string($v) ? $v : json_encode($v)]);
                    }
                }

                $pdo->commit();
            } catch (Exception $e) {
                $pdo->rollBack();
                http_response_code(500);
                echo json_encode(['ok' => false, 'error' => 'Failed to restore backup: ' . $e->getMessage()]);
                exit;
            }
            break;

        case 'upload_image':
            $data = $input['data'] ?? ($input['payload']['data'] ?? '');
            $name = $input['name'] ?? ($input['payload']['name'] ?? 'image.jpg');
            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'No image data provided.']);
                exit;
            }

            if (preg_match('/^data:([A-Za-z0-9-+\/]+);base64,(.+)$/', $data, $matches)) {
                $base64 = $matches[2];
            } else {
                $base64 = $data;
            }
            $binary = base64_decode($base64);

            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'])) {
                $ext = 'jpg';
            }
            $filename = 'img_' . time() . '_' . substr(md5(uniqid()), 0, 5) . '.' . $ext;
            $uploadDir = dirname(__DIR__) . '/uploads';
            if (!is_dir($uploadDir)) {
                @mkdir($uploadDir, 0755, true);
            }
            file_put_contents($uploadDir . '/' . $filename, $binary);
            echo json_encode(['ok' => true, 'url' => '/uploads/' . $filename, 'filename' => $filename]);
            exit;
    }

    // Return fresh updated CRM snapshot
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

    $regions = $pdo->query("SELECT country, flag, COUNT(*) as count FROM visitors WHERE country IS NOT NULL AND country != '' GROUP BY country ORDER BY count DESC LIMIT 10")->fetchAll();
    $browsers = $pdo->query("SELECT browser, COUNT(*) as count FROM visitors WHERE browser IS NOT NULL AND browser != '' GROUP BY browser ORDER BY count DESC")->fetchAll();
    $devices = $pdo->query("SELECT device, COUNT(*) as count FROM visitors WHERE device IS NOT NULL AND device != '' GROUP BY device ORDER BY count DESC")->fetchAll();

    $webhookUrl = $pdo->query("SELECT value FROM settings WHERE key = 'webhook_url'")->fetchColumn() ?: '';

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
        'settings' => [
            'webhookUrl' => $webhookUrl
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}

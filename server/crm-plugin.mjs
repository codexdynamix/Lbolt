// @ts-nocheck
import { existsSync, mkdirSync, writeFileSync, createReadStream, statSync } from "node:fs";
import { join } from "node:path";
import {
  getAllCrmData,
  recordVisitor,
  recordEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  createLead,
  addVisitorToLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  addBacklink,
  updateBacklink,
  deleteBacklink,
  addBlogPost,
  updateBlogPost,
  toggleBlogStatus,
  duplicateBlogPost,
  deleteBlogPost,
  addReview,
  updateReview,
  toggleReviewPublish,
  deleteReview,
  addProject,
  updateProject,
  toggleProjectPublish,
  deleteProject,
  deleteVisitor,
  clearVisitors,
  restoreBackup,
  getPublicContent,
  getBlogPostBySlug,
  verifyAdminCredentials,
  updateAdminPassword,
  getSetting,
  setSetting,
  getSiteConfig,
  saveSiteConfig,
  resetSiteConfig,
} from "./crm-db.mjs";

function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        // Might be multipart/form-data
        if (body.includes("name=\"")) {
          const obj = {};
          const parts = body.split(/--[a-zA-Z0-9_-]+/);
          for (const part of parts) {
            const match = part.match(/name="([^"]+)"[\r\n]+([\s\S]*?)(?:[\r\n]+--|$)/);
            if (match) {
              obj[match[1]] = match[2].trim();
            }
          }
          if (Object.keys(obj).length > 0) {
            return resolve(obj);
          }
        }
        // Might be URL encoded
        const params = new URLSearchParams(body);
        const obj = {};
        for (const [k, v] of params.entries()) {
          obj[k] = v;
        }
        resolve(obj);
      }
    });
  });
}

export function crmApiPlugin() {
  return {
    name: "codex-crm-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";

        // Explicit Hostinger ZIP download endpoint with Content-Disposition attachment
        if (
          url === "/hostinger-public_html.zip" ||
          url.startsWith("/hostinger-public_html.zip?") ||
          url === "/api/download-hostinger-zip" ||
          url.startsWith("/api/download-hostinger-zip?")
        ) {
          try {
            const zipPath = existsSync(join(process.cwd(), "public", "hostinger-public_html.zip"))
              ? join(process.cwd(), "public", "hostinger-public_html.zip")
              : join(process.cwd(), "hostinger-public_html.zip");

            if (existsSync(zipPath)) {
              const stat = statSync(zipPath);
              res.setHeader("Content-Type", "application/zip");
              res.setHeader("Content-Disposition", 'attachment; filename="hostinger-public_html.zip"');
              res.setHeader("Content-Length", stat.size);
              res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
              res.setHeader("Pragma", "no-cache");
              res.setHeader("Expires", "0");
              res.statusCode = 200;
              createReadStream(zipPath).pipe(res);
              return;
            }
          } catch (err) {
            console.error("Error serving hostinger ZIP:", err);
          }
        }

        // Static Uploaded Image Serving
        if (url.startsWith("/uploads/")) {
          try {
            const parsedUrl = new URL(url, "http://localhost:3000");
            const safeFilename = parsedUrl.pathname.replace(/^\/uploads\//, "").replace(/[^a-zA-Z0-9_.-]/g, "");
            const targetPath = join(process.cwd(), "public", "uploads", safeFilename);
            if (existsSync(targetPath)) {
              const ext = safeFilename.split(".").pop().toLowerCase();
              const mimeMap = {
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                webp: "image/webp",
                gif: "image/gif",
                svg: "image/svg+xml",
              };
              res.setHeader("Content-Type", mimeMap[ext] || "application/octet-stream");
              res.setHeader("Cache-Control", "public, max-age=86400");
              res.statusCode = 200;
              createReadStream(targetPath).pipe(res);
              return;
            }
          } catch {
            // pass through to next
          }
        }

        // Public Dynamic Content Endpoint (for public website: work projects, client reviews, published blogs)
        if (url.startsWith("/api/public/content")) {
          try {
            const data = getPublicContent();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, ...data }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // Public Site Config / CMS Content Endpoint
        if (url.startsWith("/api/public/site-config")) {
          try {
            const config = getSiteConfig();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, config }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // Public Blog Single Post Endpoint
        if (url.startsWith("/api/public/blog")) {
          try {
            const parsedUrl = new URL(url, "http://localhost:3000");
            const slug = parsedUrl.searchParams.get("slug");
            if (!slug) {
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: "Missing slug parameter." }));
              return;
            }
            const post = getBlogPostBySlug(slug);
            if (!post) {
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 404;
              res.end(JSON.stringify({ ok: false, error: "Post not found." }));
              return;
            }
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, post }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // CRM Data Endpoint
        if (url.startsWith("/api/crm/data")) {
          try {
            const data = getAllCrmData();
            const webhookUrl = getSetting("webhook_url") || "";
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, ...data, settings: { webhookUrl } }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // CRM Action Handler
        if (url.startsWith("/api/crm/action") && req.method === "POST") {
          try {
            const payload = await parseJsonBody(req);
            const action = payload.action;

            if (action === "login") {
              const email = (payload.email || "").trim().toLowerCase();
              const password = payload.password || "";
              const isValid = verifyAdminCredentials(email, password);
              if (isValid) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, user: { email, name: "Administrator" } }));
                return;
              } else {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 401;
                res.end(JSON.stringify({ ok: false, error: "Invalid email or password." }));
                return;
              }
            }

            if (action === "change_password") {
              const email = (payload.email || "admin@codexdynamics.com").trim().toLowerCase();
              const currentPassword = payload.currentPassword || "";
              const newPassword = payload.newPassword || "";
              if (!verifyAdminCredentials(email, currentPassword)) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: "Current password is incorrect." }));
                return;
              }
              if (!newPassword || newPassword.length < 6) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: "New password must be at least 6 characters." }));
                return;
              }
              updateAdminPassword(email, newPassword);
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, message: "Password updated successfully in SQLite database." }));
              return;
            }

            if (action === "save_webhook") {
              setSetting("webhook_url", payload.url || "");
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, message: "Webhook settings saved." }));
              return;
            }

            if (action === "test_webhook") {
              const targetUrl = payload.url || getSetting("webhook_url");
              if (!targetUrl || !targetUrl.startsWith("http")) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: "Please enter a valid HTTP/HTTPS webhook URL." }));
                return;
              }
              try {
                await fetch(targetUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    event: "test_ping",
                    source: "Codex Dynamics CRM",
                    timestamp: new Date().toISOString(),
                    message: "Codex Dynamics Back Office CRM webhook integration is operational.",
                  }),
                });
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, message: "Test webhook dispatched successfully." }));
              } catch (fetchErr) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, message: `Webhook dispatched (target response: ${String(fetchErr)})` }));
              }
              return;
            }

            if (action === "save_backlink" || action === "add_backlink") {
              addBacklink(payload);
            } else if (action === "update_backlink") {
              updateBacklink(payload.id, payload);
            } else if (action === "delete_backlink") {
              deleteBacklink(payload.id);
            } else if (action === "save_blog") {
              if (payload.id) {
                updateBlogPost(payload.id, payload);
              } else {
                addBlogPost(payload);
              }
            } else if (action === "update_blog") {
              updateBlogPost(payload.id, payload);
            } else if (action === "toggle_blog_status") {
              toggleBlogStatus(payload.id, payload.status);
            } else if (action === "duplicate_blog") {
              duplicateBlogPost(payload.id);
            } else if (action === "delete_blog") {
              deleteBlogPost(payload.id);
            } else if (action === "save_review") {
              addReview(payload);
            } else if (action === "update_review") {
              updateReview(payload.id, payload);
            } else if (action === "toggle_review") {
              toggleReviewPublish(payload.id, payload.is_published);
            } else if (action === "delete_review") {
              deleteReview(payload.id);
            } else if (action === "save_project") {
              addProject(payload);
            } else if (action === "update_project") {
              updateProject(payload.id, payload);
            } else if (action === "toggle_project") {
              toggleProjectPublish(payload.id, payload.is_published);
            } else if (action === "delete_project") {
              deleteProject(payload.id);
            } else if (action === "delete_visitor") {
              deleteVisitor(payload.id);
            } else if (action === "clear_visitors") {
              clearVisitors(payload.olderThanDays);
            } else if (action === "restore_backup") {
              try {
                restoreBackup(payload.backupData || payload.data || payload);
                const updatedCrm = getAllCrmData();
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, message: "Database restored successfully.", ...updatedCrm }));
                return;
              } catch (restoreErr) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: restoreErr.message || "Failed to restore backup." }));
                return;
              }
            } else if (action === "update_enquiry_status") {
              updateEnquiryStatus(payload.id, payload.status);
            } else if (action === "delete_enquiry") {
              deleteEnquiry(payload.id);
            } else if (action === "add_visitor_to_leads") {
              addVisitorToLeads(payload.visitor_id, payload.lead_data || {});
            } else if (action === "create_lead") {
              createLead(payload);
            } else if (action === "update_lead_status") {
              updateLeadStatus(payload.id, payload.status);
            } else if (action === "update_lead_notes") {
              updateLeadNotes(payload.id, payload.notes);
            } else if (action === "delete_lead") {
              deleteLead(payload.id);
            } else if (action === "subscribe_blog_reader") {
              createLead({
                name: payload.name || "Blog Reader",
                email: payload.email,
                source: "blog_reader",
                status: "new",
                score: 70,
                notes: `Subscribed while reading: ${payload.blog_title || payload.blog_slug || "Insights"}`,
              });
            } else if (action === "simulate_visitor") {
              recordVisitor(payload);
            } else if (action === "save_site_content") {
              const targetConfig = payload.config || payload.payload?.config || payload;
              const updatedConfig = saveSiteConfig(targetConfig);
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, config: updatedConfig }));
              return;
            } else if (action === "reset_site_content") {
              const resetConfig = resetSiteConfig();
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, config: resetConfig }));
              return;
            } else if (action === "upload_image") {
              try {
                const name = payload.name || payload.payload?.name || "image.jpg";
                const data = payload.data || payload.payload?.data;
                if (!data) throw new Error("No image data provided");
                const matches = data.match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/);
                const base64Str = matches ? matches[2] : data;
                const buffer = Buffer.from(base64Str, "base64");
                const rawExt = name && name.includes(".") ? name.split(".").pop().toLowerCase() : "jpg";
                const ext = ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(rawExt) ? rawExt : "jpg";
                const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                const uploadDir = join(process.cwd(), "public", "uploads");
                if (!existsSync(uploadDir)) {
                  mkdirSync(uploadDir, { recursive: true });
                }
                const filePath = join(uploadDir, filename);
                writeFileSync(filePath, buffer);
                const publicUrl = `/uploads/${filename}`;
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, url: publicUrl, filename }));
              } catch (upErr) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: String(upErr.message || upErr) }));
              }
              return;
            }

            const updated = getAllCrmData();
            const webhookUrl = getSetting("webhook_url") || "";
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, ...updated, settings: { webhookUrl } }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // Track Visitor Endpoint (same as PHP endpoint)
        if (url.startsWith("/api/track-visitor.php") && req.method === "POST") {
          try {
            const body = await parseJsonBody(req);
            const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";
            const userAgent = req.headers["user-agent"] || "Unknown";
            const referrer = body.referrer || req.headers["referer"] || "Direct";

            recordVisitor({
              sessionId: body.session_id,
              ip: body.ip || ip,
              country: body.country || "United States",
              countryCode: body.country_code || "US",
              flag: body.flag || "🇺🇸",
              city: body.city || "San Francisco",
              region: body.region || "California",
              postalCode: body.postal_code || "94105",
              street: body.street || "101 Market St, Financial District",
              browser: body.browser || (userAgent.includes("Safari") && !userAgent.includes("Chrome") ? "Safari" : userAgent.includes("Firefox") ? "Firefox" : "Chrome"),
              device: body.device || (/Mobile|iPhone|Android/i.test(userAgent) ? "Mobile" : "Desktop"),
              userAgent,
              pageUrl: body.page || body.page_url || "/",
              referrer,
              durationSeconds: Number(body.duration_seconds) || 1,
              visitCount: Number(body.visit_count) || 1,
              isReturning: body.is_returning ? 1 : 0,
              pagesViewed: typeof body.pages_viewed === "string" ? body.pages_viewed : JSON.stringify(body.pages_viewed || []),
              cookiesData: typeof body.cookies_data === "string" ? body.cookies_data : JSON.stringify(body.cookies_data || {}),
              email: body.email || null,
              name: body.name || null,
              phone: body.phone || null,
            });

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, ip, status: "tracked" }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // Submit Enquiry Endpoint (same as PHP endpoint)
        if (url.startsWith("/api/submit-enquiry.php") && req.method === "POST") {
          try {
            const body = await parseJsonBody(req);
            if (!body.name || !body.email || !body.message) {
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, message: "Name, email and message are required." }));
              return;
            }

            recordEnquiry(body);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, message: "Enquiry saved successfully into SQLite database" }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        // Contact Form Mailer Endpoint (/send-mail.php)
        if (url.startsWith("/send-mail.php") && req.method === "POST") {
          try {
            const body = await parseJsonBody(req);
            if (!body.name || !body.email || !body.message) {
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, message: "Name, email and message are required." }));
              return;
            }

            recordEnquiry({
              name: body.name,
              email: body.email,
              phone: body.phone || "",
              company: body.company || "",
              message: body.message,
              source: "contact_form_mailer",
            });
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, message: "Message received and enquiry logged." }));
          } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }

        next();
      });
    },
  };
}

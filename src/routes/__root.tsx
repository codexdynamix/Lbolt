import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import { TidioWidget } from "@/components/TidioWidget";
import appCss from "../styles.css?url";

const APP_NAME = "Codex Dynamics";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "High-performance websites, web design, web development, custom CRMs, and digital marketing agency.",
      },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  localStorage.setItem('codex-theme', 'light');
                } catch (e) {}
                try {
                  var now = Date.now();
                  var history = JSON.parse(sessionStorage.getItem('__cdx_reload_history') || '[]');
                  history = history.filter(function(t) { return (now - t) < 8000; });
                  if (history.length >= 2) {
                    console.warn('[Guard] Rapid reload suppressed to ensure site stability.');
                    location.reload = function() {
                      console.warn('[Guard] location.reload blocked.');
                    };
                  }
                  history.push(now);
                  sessionStorage.setItem('__cdx_reload_history', JSON.stringify(history));
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <PreviewHostBridge />
        <ThemeProvider>
          <ContactModalProvider>
            <SiteConfigProvider>
              <TidioWidget />
              <AuthProvider>
                <Outlet />
                <Toaster
                  position="top-center"
                  offset={56}
                  toastOptions={{
                    style: {
                      background: "var(--color-paper)",
                      border: "1px solid var(--color-hairline)",
                      color: "var(--color-label)",
                      borderRadius: "12px",
                    },
                  }}
                />
              </AuthProvider>
            </SiteConfigProvider>
          </ContactModalProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  ),
});

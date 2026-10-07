import { resolveGeoLocation } from "./geo-utils";

export interface VisitorData {
  session_id: string;
  ip_address: string;
  country: string;
  flag: string;
  browser: string;
  device: string;
  user_agent: string;
  page_url: string;
  referrer?: string;
  created_at?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  street?: string;
  duration_seconds?: number;
  visit_count?: number;
  is_returning?: number;
  pages_viewed?: string;
  cookies_data?: string;
  email?: string;
  name?: string;
  phone?: string;
  is_lead?: number;
}

export function detectBrowser(ua: string): string {
  if (/edg/i.test(ua)) return "Edge 124";
  if (/opr|opera/i.test(ua)) return "Opera 109";
  if (/chrome|crios/i.test(ua)) return "Chrome 125";
  if (/firefox|fxios/i.test(ua)) return "Firefox 126";
  if (/safari/i.test(ua)) return "Safari 17.4";
  return "Modern Browser";
}

export function detectDevice(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return "Tablet";
  if (/iphone/i.test(ua)) return "Mobile (iPhone)";
  if (/android/i.test(ua)) return "Mobile (Android)";
  if (/macintosh|mac os/i.test(ua)) return "Desktop (macOS)";
  if (/windows/i.test(ua)) return "Desktop (Windows)";
  if (/linux/i.test(ua)) return "Desktop (Linux)";
  return "Desktop";
}

// Cookie Helper Functions
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getAllCookiesMap(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const pairs = document.cookie.split(";");
  const result: Record<string, string> = {};
  for (const pair of pairs) {
    const trimmed = pair.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx);
      const val = decodeURIComponent(trimmed.slice(eqIdx + 1));
      result[key] = val;
    }
  }
  return result;
}

// State tracking in memory during active browser session
let sessionStartTime = Date.now();
let heartbeatInterval: NodeJS.Timeout | null = null;
let isTrackerInitialized = false;

export function recordLeadContactInfo(email: string, name?: string, phone?: string): void {
  if (typeof window === "undefined") return;
  if (email) setCookie("__cdx_lead_email", email.trim());
  if (name) setCookie("__cdx_lead_name", name.trim());
  if (phone) setCookie("__cdx_lead_phone", phone.trim());

  // Immediately send sync ping to tie contact info to the active visitor session
  void trackCurrentVisitor(window.location.pathname + window.location.hash);
}

let lastTrackedUrl = "";
let lastTrackedTime = 0;

export async function trackCurrentVisitor(page = "/"): Promise<void> {
  if (typeof window === "undefined") return;

  const activeUrl = page || window.location.pathname + window.location.hash || "/";
  const now = Date.now();
  if (activeUrl === lastTrackedUrl && now - lastTrackedTime < 3000) {
    return;
  }
  lastTrackedUrl = activeUrl;
  lastTrackedTime = now;

  try {
    // 1. Manage Persistent Visitor Cookie UUID (__cdx_vid)
    let visitorUuid = getCookie("__cdx_vid");
    const isNewVisitor = !visitorUuid;
    if (!visitorUuid) {
      visitorUuid = `vid_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
      setCookie("__cdx_vid", visitorUuid, 365);
    }

    // 2. Manage Visit Count (__cdx_visit_count)
    let visitCount = parseInt(getCookie("__cdx_visit_count") || "0", 10);
    const sessionCookie = getCookie("__cdx_session");
    if (!sessionCookie) {
      visitCount += 1;
      setCookie("__cdx_visit_count", String(visitCount), 365);
    }

    // 3. Manage First Visit Timestamp (__cdx_first_visit)
    let firstVisit = getCookie("__cdx_first_visit");
    if (!firstVisit) {
      firstVisit = new Date().toISOString();
      setCookie("__cdx_first_visit", firstVisit, 365);
    }

    // 4. Session ID in cookie & sessionStorage
    let sessionId = sessionStorage.getItem("codex_session_id") || getCookie("__cdx_session");
    if (!sessionId) {
      sessionId = `sess_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem("codex_session_id", sessionId);
      setCookie("__cdx_session", sessionId, 1);
      sessionStartTime = Date.now();
    }

    // 5. Manage Cookie Consent & Marketing UTMs
    if (!getCookie("__cdx_cookie_consent")) {
      setCookie("__cdx_cookie_consent", "accepted", 365);
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("utm_source")) {
      setCookie("__cdx_utm_source", urlParams.get("utm_source") || "", 30);
    }
    if (urlParams.get("utm_campaign")) {
      setCookie("__cdx_utm_campaign", urlParams.get("utm_campaign") || "", 30);
    }

    // 6. Track Pages Clicked and Visited History (__cdx_pages_history)
    let pagesHistory: Array<{ url: string; title: string; timestamp: string }> = [];
    try {
      const storedHistory = getCookie("__cdx_pages_history") || sessionStorage.getItem("cdx_pages_history");
      if (storedHistory) {
        pagesHistory = JSON.parse(storedHistory);
      }
    } catch {
      pagesHistory = [];
    }

    const activeUrl = page || window.location.pathname + window.location.hash || "/";
    const lastPage = pagesHistory[pagesHistory.length - 1];
    if (!lastPage || lastPage.url !== activeUrl) {
      pagesHistory.push({
        url: activeUrl,
        title: document.title || "Codex Dynamics",
        timestamp: new Date().toISOString(),
      });
      // Cap at 15 most recent for cookie size safety
      if (pagesHistory.length > 15) {
        pagesHistory = pagesHistory.slice(pagesHistory.length - 15);
      }
      const historyStr = JSON.stringify(pagesHistory);
      setCookie("__cdx_pages_history", historyStr, 30);
      try {
        sessionStorage.setItem("cdx_pages_history", historyStr);
      } catch {
        // Storage safe
      }
    }

    // 7. Calculate Time Spent / Duration
    const durationSeconds = Math.max(1, Math.floor((Date.now() - sessionStartTime) / 1000));
    setCookie("__cdx_duration_secs", String(durationSeconds), 1);

    // 8. Device & Geo Resolution
    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);
    const device = detectDevice(ua);

    // Timezone based country estimate
    let countryGuess = "United States";
    let flagGuess = "🇺🇸";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Europe/Kiev") || tz.includes("Kyiv")) {
      countryGuess = "Ukraine";
      flagGuess = "🇺🇦";
    } else if (tz.includes("London") || tz.includes("Europe/London")) {
      countryGuess = "United Kingdom";
      flagGuess = "🇬🇧";
    } else if (tz.includes("Berlin") || tz.includes("Europe/Berlin") || tz.includes("Paris") || tz.includes("Europe")) {
      countryGuess = "Germany";
      flagGuess = "🇩🇪";
    } else if (tz.includes("Dubai") || tz.includes("Asia/Dubai")) {
      countryGuess = "United Arab Emirates";
      flagGuess = "🇦🇪";
    } else if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("America/Toronto")) {
      countryGuess = "Canada";
      flagGuess = "🇨🇦";
    } else if (tz.includes("Tokyo") || tz.includes("Asia/Tokyo")) {
      countryGuess = "Japan";
      flagGuess = "🇯🇵";
    }

    const geo = resolveGeoLocation(countryGuess, flagGuess);

    const referrer = document.referrer ? new URL(document.referrer).hostname : "Direct";

    // Gather all cookies for full telemetry inspection in the CRM modal
    const allCookies = getAllCookiesMap();
    allCookies.__cdx_screen = `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x DPR)`;
    allCookies.__cdx_lang = navigator.language;
    allCookies.__cdx_platform = navigator.platform;

    const email = getCookie("__cdx_lead_email") || "";
    const name = getCookie("__cdx_lead_name") || "";
    const phone = getCookie("__cdx_lead_phone") || "";

    const payload = {
      session_id: sessionId,
      page: activeUrl,
      country: geo.country,
      country_code: geo.countryCode,
      flag: geo.flag,
      city: geo.city,
      region: geo.region,
      postal_code: geo.postalCode,
      street: geo.street,
      browser,
      device,
      referrer,
      duration_seconds: durationSeconds,
      visit_count: visitCount,
      is_returning: visitCount > 1 || !isNewVisitor ? 1 : 0,
      pages_viewed: JSON.stringify(pagesHistory),
      cookies_data: JSON.stringify(allCookies),
      email,
      name,
      phone,
    };

    // Send to SQLite API
    await fetch("/api/track-visitor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    // Set up heartbeat listener once
    if (!isTrackerInitialized && typeof window !== "undefined") {
      isTrackerInitialized = true;

      // Listen to browser back/forward page changes only if pathname changes
      let lastKnownPathname = window.location.pathname;
      window.addEventListener("popstate", () => {
        if (window.location.pathname !== lastKnownPathname) {
          lastKnownPathname = window.location.pathname;
          void trackCurrentVisitor(window.location.pathname);
        }
      });

      // Periodic heartbeat every 15s to update duration and keep session live
      if (!heartbeatInterval) {
        heartbeatInterval = setInterval(() => {
          const currentDuration = Math.max(1, Math.floor((Date.now() - sessionStartTime) / 1000));
          setCookie("__cdx_duration_secs", String(currentDuration), 1);
          void fetch("/api/track-visitor.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: sessionId,
              duration_seconds: currentDuration,
              page: window.location.pathname + window.location.hash,
            }),
          }).catch(() => {});
        }, 15000);
      }
    }
  } catch {
    // Non-blocking
  }
}

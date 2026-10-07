import { useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

declare global {
  interface Window {
    tidioChatApi?: {
      open: () => void;
      close: () => void;
      show: () => void;
      hide: () => void;
      on: (event: string, callback: () => void) => void;
      setColorPallete?: (color: string) => void;
    };
  }
}

export function TidioWidget() {
  const { config } = useSiteConfig();
  const tidio = config.tidio;

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // Check if we are on admin route
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    if (isAdminRoute && tidio?.disableOnAdmin) {
      if (window.tidioChatApi?.hide) {
        window.tidioChatApi.hide();
      }
      return;
    }

    if (!tidio?.enabled || !tidio?.publicKey?.trim()) {
      // If disabled or empty key, remove any existing tidio script, iframe, and styles
      const existingScript = document.getElementById("tidio-chat-script");
      if (existingScript) existingScript.remove();
      const tidioIframe = document.getElementById("tidio-chat-iframe");
      if (tidioIframe) tidioIframe.remove();
      const styleEl = document.getElementById("tidio-custom-styles");
      if (styleEl) styleEl.remove();
      window.dispatchEvent(new CustomEvent("tidio-chat-close"));
      return;
    }

    // Clean the public key (user might paste full URL or script tag)
    let key = tidio.publicKey.trim();
    if (key.includes("code.tidio.co/")) {
      const match = key.match(/code\.tidio\.co\/([a-zA-Z0-9_-]+)(?:\.js)?/);
      if (match) key = match[1];
    } else if (key.includes("<script")) {
      const match = key.match(/src=["'](?:https?:)?\/\/code\.tidio\.co\/([a-zA-Z0-9_-]+)(?:\.js)?["']/);
      if (match) key = match[1];
    }
    // Remove trailing .js if user typed it
    key = key.replace(/\.js$/, "");

    if (!key) return;

    // Apply custom positioning and mobile visibility styles
    const isLeft = tidio.position === "bottom-left";
    const hideMobile = Boolean(tidio.hideOnMobile);

    let styleEl = document.getElementById("tidio-custom-styles") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "tidio-custom-styles";
      document.head.appendChild(styleEl);
    }

    const updateStyles = (isOpen: boolean) => {
      if (!styleEl) return;
      styleEl.textContent = `
        #tidio-chat-iframe, #tidio-chat {
          ${isLeft ? "left: env(safe-area-inset-left, 0px) !important; right: auto !important;" : "right: env(safe-area-inset-right, 0px) !important; left: auto !important;"}
          bottom: env(safe-area-inset-bottom, 0px) !important;
          z-index: ${isOpen ? "2147483647" : "2147483640"} !important;
        }
        ${hideMobile ? "@media (max-width: 640px) { #tidio-chat-iframe, #tidio-chat { display: none !important; } }" : ""}
      `;
    };
    updateStyles(false);

    // Check if already injected with the same key
    const scriptId = "tidio-chat-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `//code.tidio.co/${encodeURIComponent(key)}.js`;
      script.async = true;
      document.body.appendChild(script);
    } else if (!script.src.includes(key)) {
      // Key changed, replace script
      script.src = `//code.tidio.co/${encodeURIComponent(key)}.js`;
    }

    // Unhide if was previously hidden
    if (window.tidioChatApi?.show) {
      window.tidioChatApi.show();
    }

    // Listen for Tidio open/close states to coordinate with WhatsAppDock
    let lastOpen = false;
    const notifyState = (isOpen: boolean) => {
      if (isOpen !== lastOpen) {
        lastOpen = isOpen;
        updateStyles(isOpen);
        window.dispatchEvent(
          new CustomEvent("tidio-chat-status", { detail: { isOpen } })
        );
        if (isOpen) {
          window.dispatchEvent(new CustomEvent("tidio-chat-open"));
        } else {
          window.dispatchEvent(new CustomEvent("tidio-chat-close"));
        }
      }
    };

    let apiBound = false;
    const bindApi = () => {
      if (window.tidioChatApi?.on && !apiBound) {
        apiBound = true;
        window.tidioChatApi.on("open", () => notifyState(true));
        window.tidioChatApi.on("close", () => notifyState(false));
      }
    };
    bindApi();

    // Fallback dimension observer on iframe in case event listeners aren't fired immediately
    const checkIframe = () => {
      bindApi();
      const iframe = document.getElementById("tidio-chat-iframe");
      if (iframe) {
        const height = iframe.offsetHeight || iframe.getBoundingClientRect().height;
        // When chat is open, Tidio iframe expands from ~94px to >250px
        if (height > 220) {
          notifyState(true);
        } else {
          notifyState(false);
        }
      }
    };

    const interval = setInterval(checkIframe, 800);

    return () => {
      clearInterval(interval);
    };
  }, [tidio?.enabled, tidio?.publicKey, tidio?.disableOnAdmin, tidio?.position, tidio?.hideOnMobile]);

  return null;
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FacebookLogo,
  GmailLogo,
  InstagramLogo,
  PhoneLogo,
  TelegramLogo,
  ViberLogo,
  WhatsAppLogo,
} from "@/components/BrandMarks";
import { LINKS } from "@/lib/site";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function WhatsAppDock() {
  const [open, setOpen] = useState(false);
  const [isTidioOpen, setIsTidioOpen] = useState(false);
  const {
    config,
    primaryPhone,
    primaryEmail,
    primaryWhatsApp,
    primaryTelegram,
    primaryViber,
    socialsGrouped,
  } = useSiteConfig();

  // Listen for Tidio open/close events to auto-hide dock when full chat window is active
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => setIsTidioOpen(true);
    const handleClose = () => setIsTidioOpen(false);
    const handleStatus = (e: Event) => {
      const custom = e as CustomEvent<{ isOpen?: boolean }>;
      if (typeof custom.detail?.isOpen === "boolean") {
        setIsTidioOpen(custom.detail.isOpen);
      }
    };

    window.addEventListener("tidio-chat-open", handleOpen);
    window.addEventListener("tidio-chat-close", handleClose);
    window.addEventListener("tidio-chat-status", handleStatus);

    // Initial check in case Tidio is already open
    const iframe = document.getElementById("tidio-chat-iframe");
    if (iframe && (iframe.offsetHeight || iframe.getBoundingClientRect().height) > 220) {
      setIsTidioOpen(true);
    }

    return () => {
      window.removeEventListener("tidio-chat-open", handleOpen);
      window.removeEventListener("tidio-chat-close", handleClose);
      window.removeEventListener("tidio-chat-status", handleStatus);
    };
  }, []);

  const waConfig = config.whatsapp;
  if (waConfig && waConfig.enabled === false) {
    return null;
  }

  const tidio = config.tidio;
  const isTidioActive = Boolean(tidio?.enabled && tidio?.publicKey?.trim());
  const isLeft = waConfig?.position === "bottom-left";
  const tidioIsLeft = tidio?.position === "bottom-left";

  // Check if Tidio and WhatsApp share the same horizontal corner
  const sameCorner = (isLeft && tidioIsLeft) || (!isLeft && !tidioIsLeft);

  // Check if we are on an admin route where Tidio is hidden
  const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
  const isTidioVisible = isTidioActive && !(isAdmin && tidio?.disableOnAdmin);

  // If both sit in the same corner, offset WhatsAppDock upward so it rests cleanly above Tidio
  const shouldOffset = isTidioVisible && sameCorner;

  const rawPhone = (waConfig?.number || primaryWhatsApp?.value || "+380636406783").replace(/[^\d]/g, "");
  const defaultMsg = waConfig?.defaultMessage || "";
  const whatsappHref = `https://wa.me/${rawPhone}${defaultMsg ? `?text=${encodeURIComponent(defaultMsg)}` : ""}`;
  const showExtras = waConfig?.showExtraChannels !== false;

  const recipientEmail = config.formSubmitEmail || primaryEmail?.value || "hello@codexdynamics.com";
  const telegramHref = primaryTelegram?.href || LINKS.telegram;
  const viberHref = primaryViber?.href || LINKS.viber;
  const phoneHref = primaryPhone?.href || LINKS.tel;
  const instagramHref = socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
  const facebookHref = socialsGrouped.facebook?.[0]?.href || LINKS.facebook;

  const extras = [
    { href: telegramHref, label: "Telegram", Logo: TelegramLogo, external: true },
    { href: viberHref, label: "Viber", Logo: ViberLogo, external: true },
    { href: phoneHref, label: "Call", Logo: PhoneLogo, external: false },
    { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}`, label: "Gmail", Logo: GmailLogo, external: true },
    { href: instagramHref, label: "Instagram", Logo: InstagramLogo, external: true },
    { href: facebookHref, label: "Facebook", Logo: FacebookLogo, external: true },
  ];

  const isTidioMobileHidden = Boolean(tidio?.hideOnMobile);

  return (
    <AnimatePresence>
      {!isTidioOpen && (
        <motion.div
          key="whatsapp-dock"
          initial={{ opacity: 0, scale: 0.85, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 14 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none fixed ${
            shouldOffset
              ? isLeft
                ? "left-[calc(22px+env(safe-area-inset-left,0px))] items-start"
                : "right-[calc(22px+env(safe-area-inset-right,0px))] items-end"
              : isLeft
                ? "left-[calc(18px+env(safe-area-inset-left,0px))] items-start"
                : "right-[calc(18px+env(safe-area-inset-right,0px))] items-end"
          } ${
            shouldOffset
              ? isTidioMobileHidden
                ? "bottom-[calc(18px+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(118px+env(safe-area-inset-bottom,0px))]"
                : "bottom-[calc(118px+env(safe-area-inset-bottom,0px))]"
              : "bottom-[calc(18px+env(safe-area-inset-bottom,0px))]"
          } z-[2147483647] flex flex-col gap-2.5 transition-all duration-300`}
          style={{ zIndex: 2147483647 }}
        >
          <div
            className={`pointer-events-auto flex flex-col ${isLeft ? "items-start" : "items-end"} gap-2.5`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <AnimatePresence>
              {open && showExtras ? (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col ${isLeft ? "items-start" : "items-end"} gap-2.5`}
                >
                  {extras.map((channel, i) => (
                    <motion.a
                      key={channel.label}
                      href={channel.href}
                      {...("external" in channel && channel.external === false
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      initial={{ opacity: 0, x: isLeft ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.28 }}
                      className={`group flex items-center gap-2.5 ${isLeft ? "flex-row-reverse" : "flex-row"}`}
                      aria-label={channel.label}
                    >
                      <span className="dock-label rounded-full px-3 py-1 text-[13px] font-medium text-label">
                        {channel.label}
                      </span>
                      <div className="flex size-[50px] items-center justify-center">
                        <channel.Logo className="size-9 drop-shadow-[0_8px_18px_rgb(0_0_0_/_0.2)]" />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className={`flex items-center ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex size-[50px] min-w-[50px] min-h-[50px] w-[50px] h-[50px] items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96] shadow-[0_6px_20px_rgba(37,211,102,0.38),0_2px_6px_rgba(0,0,0,0.1)]"
                aria-label="WhatsApp"
                onFocus={() => setOpen(true)}
              >
                <WhatsAppLogo className="size-[50px] w-[50px] h-[50px]" />
                <span className="wa-pulse" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

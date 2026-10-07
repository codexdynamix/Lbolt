import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  FacebookLogo,
  GmailLogo,
  InstagramLogo,
  MapsLogo,
  PhoneLogo,
  TelegramLogo,
  ViberLogo,
  WhatsAppLogo,
} from "@/components/BrandMarks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { CONTACT, LINKS } from "@/lib/site";
import { useSiteConfig } from "@/context/SiteConfigContext";

type Inquiry = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  service?: string;
  message: string;
};

const emptyForm: Inquiry = {
  name: "",
  phone: "",
  email: "",
  company: "",
  budget: "",
  timeline: "",
  service: "",
  message: "",
};

async function copyText(value: string, ok: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(ok);
  } catch {
    toast.error("Could not copy. Try selecting it instead.");
  }
}

function isJsonResponse(res: Response) {
  return (res.headers.get("content-type") ?? "").includes("application/json");
}

async function postPhp(
  data: Inquiry,
): Promise<"sent" | "unavailable" | "rejected"> {
  try {
    const payload = new FormData();
    payload.set("name", data.name);
    payload.set("phone", data.phone);
    payload.set("email", data.email);
    payload.set("message", data.message);

    const res = await fetch("/send-mail.php", {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const text = await res.text();
    if (text.trimStart().startsWith("<?php") || !isJsonResponse(res)) {
      return "unavailable";
    }
    const body = JSON.parse(text) as { ok?: boolean };
    return body.ok ? "sent" : "rejected";
  } catch {
    return "unavailable";
  }
}

async function postFormSubmit(data: Inquiry, recipientEmail?: string): Promise<boolean> {
  try {
    const targetEmail = recipientEmail || CONTACT.email;
    const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        _subject: `New inquiry from ${data.name} — Codex Dynamics`,
        _template: "table",
        _replyto: data.email,
        _captcha: "false",
      }),
    });
    if (!res.ok) return false;
    const body = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;
    if (!body) return false;
    if (body.success === true || body.success === "true") return true;
    return /activat/i.test(String(body.message ?? ""));
  } catch {
    return false;
  }
}

function persistInquiry(data: Inquiry) {
  try {
    const raw = localStorage.getItem("codex-inquiries");
    const prior = raw ? (JSON.parse(raw) as unknown[]) : [];
    localStorage.setItem(
      "codex-inquiries",
      JSON.stringify([...prior, { ...data, at: new Date().toISOString() }]),
    );
    // Also save to SQLite CRM database
    void fetch("/api/submit-enquiry.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: "",
        message: data.message,
        source: "website_contact_form",
      }),
    }).catch(() => {});
  } catch {
    /* ignore quota */
  }
}

export function Contact() {
  const {
    config,
    socialsGrouped,
    addresses,
    primaryPhone,
    primaryWhatsApp,
    primaryTelegram,
    primaryViber,
    primaryEmail,
    primaryAddress,
  } = useSiteConfig();

  const recipientEmail = config.formSubmitEmail || primaryEmail?.value || CONTACT.email;
  const phoneVal = primaryPhone?.value || CONTACT.phoneDisplay;
  const phoneRaw = primaryPhone?.value?.replace(/[^\d+]/g, "") || CONTACT.phoneE164;
  const phoneHref = primaryPhone?.href || `tel:${phoneRaw}`;

  const currentAddress = primaryAddress || {
    id: "addr-default",
    label: "Kyiv Office",
    city: "Kyiv",
    street: CONTACT.addressStreet,
    fullAddress: CONTACT.addressFull,
    lat: 50.4385,
    lng: 30.5235,
  };

  const whatsappUrl = primaryWhatsApp?.href || LINKS.whatsapp;
  const telegramUrl = primaryTelegram?.href || LINKS.telegram;
  const viberUrl = primaryViber?.href || LINKS.viber;
  const instagramUrl = socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
  const facebookUrl = socialsGrouped.facebook?.[0]?.href || LINKS.facebook;

  const actionList = [
    { href: whatsappUrl, label: "WhatsApp", hint: "WhatsApp", Logo: WhatsAppLogo, external: true },
    { href: telegramUrl, label: "Telegram", hint: "Telegram", Logo: TelegramLogo, external: true },
    { href: viberUrl, label: "Viber", hint: "Viber", Logo: ViberLogo, external: true },
    { href: phoneHref, label: "Call", hint: "Call", Logo: PhoneLogo, external: false },
    { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}`, label: "Gmail", hint: "Gmail", Logo: GmailLogo, external: true },
  ];

  const [formData, setFormData] = useState<Inquiry>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      toast.success("Message sent. We'll be in touch within a day.");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const extraNotes = [
      formData.company ? `Company: ${formData.company}` : null,
      formData.service ? `Service: ${formData.service}` : null,
      formData.budget ? `Budget: ${formData.budget}` : null,
      formData.timeline ? `Timeline: ${formData.timeline}` : null,
    ].filter(Boolean).join(" | ");

    const finalMessage = extraNotes
      ? `[${extraNotes}]\n\n${formData.message.trim()}`
      : formData.message.trim();

    const data: Inquiry = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      company: formData.company?.trim(),
      budget: formData.budget?.trim(),
      timeline: formData.timeline?.trim(),
      service: formData.service?.trim(),
      message: finalMessage,
    };
    if (!data.name || !data.email || !data.message) {
      toast.error("Please fill in every field.");
      return;
    }
    setIsSubmitting(true);
    try {
      const php = await postPhp(data);
      if (php === "rejected") {
        toast.error(
          `Could not send. Email us at ${recipientEmail} or WhatsApp ${phoneVal}.`,
        );
        return;
      }
      if (php !== "sent") {
        await postFormSubmit(data, recipientEmail);
      }
      persistInquiry(data);
      toast.success("Message sent. We'll be in touch within a day.");
      setFormData(emptyForm);
    } catch {
      toast.error(
        `Could not send. Email us at ${recipientEmail} or WhatsApp ${phoneVal}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-24 bg-fill-elevated py-16 sm:py-24"
    >
      <div className="shell">
        <Reveal>
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-subtle uppercase">
            {config.contact?.badge || "Contact"}
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-label sm:text-5xl lg:text-6xl">
            {config.contact?.title || "One number. Every channel."}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {config.contact?.subtitle || "WhatsApp, Telegram, Viber, calls — same line. Write us, or visit our office."}
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <article className="surface-lift flex h-full max-h-[740px] flex-col overflow-hidden rounded-xl bg-card">
              <div className="shrink-0 flex flex-col items-center px-6 pt-8 pb-5 text-center">
                <span className="flex size-14 items-center justify-center rounded-[1.25rem] bg-blue text-xl font-semibold text-paper shadow-[inset_0_0.5px_0_rgb(255_255_255_/_0.35)]">
                  {config.siteName?.[0] || CONTACT.name[0] || "C"}
                </span>
                <h3 className="mt-3.5 text-2xl font-semibold tracking-tight text-label">
                  {config.siteName || CONTACT.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentAddress.city} office · {currentAddress.street}
                </p>
              </div>

              <div className="shrink-0 grid grid-cols-5 gap-1 border-b border-hairline px-3 pb-5 sm:px-5">
                {actionList.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex flex-col items-center gap-2 rounded-xl py-2 transition-colors duration-150 hover:bg-fill"
                  >
                    <action.Logo className="size-10 sm:size-11" />
                    <span className="text-[10px] font-medium tracking-wide text-label sm:text-[11px]">
                      {action.hint}
                    </span>
                  </a>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <ul className="divide-y divide-hairline">
                {/* Phone Numbers */}
                {socialsGrouped.phone?.map((phone, idx) => (
                  <li key={`phone-${phone.id || idx}`}>
                    <div className="flex w-full items-center justify-between gap-3 px-5 py-3.5 hover:bg-fill transition-colors">
                      <a
                        href={phone.href || `tel:${phone.value.replace(/[^\d+]/g, "")}`}
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <PhoneLogo className="size-8 sm:size-9 shrink-0" />
                        <span className="min-w-0 truncate">
                          <span className="block text-xs text-subtle truncate">
                            {phone.label || "Direct Phone Line"} {phone.isPrimary && "· Primary"}
                          </span>
                          <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate font-mono">
                            {phone.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(phone.value.replace(/[^\d+]/g, ""), "Phone number copied.")
                        }
                        className="px-2.5 py-1 text-xs text-muted-foreground hover:text-label hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition shrink-0 cursor-pointer"
                        title="Copy number"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}

                {/* WhatsApp Lines */}
                {socialsGrouped.whatsapp?.map((wa, idx) => (
                  <li key={`wa-${wa.id || idx}`}>
                    <div className="flex w-full items-center justify-between gap-3 px-5 py-3.5 hover:bg-fill transition-colors">
                      <a
                        href={wa.href || `https://wa.me/${wa.value.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <WhatsAppLogo className="size-8 sm:size-9 shrink-0" />
                        <span className="min-w-0 truncate">
                          <span className="block text-xs text-subtle truncate">
                            {wa.label || "WhatsApp Business"} {wa.isPrimary && "· Primary"}
                          </span>
                          <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate font-mono">
                            {wa.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(wa.value.replace(/[^0-9+]/g, ""), "WhatsApp number copied.")
                        }
                        className="px-2.5 py-1 text-xs text-muted-foreground hover:text-label hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition shrink-0 cursor-pointer"
                        title="Copy WhatsApp"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}

                {/* Telegram Accounts */}
                {socialsGrouped.telegram?.map((tg, idx) => (
                  <li key={`tg-${tg.id || idx}`}>
                    <div className="flex w-full items-center justify-between gap-3 px-5 py-3.5 hover:bg-fill transition-colors">
                      <a
                        href={tg.href || `https://t.me/${tg.value.replace(/^@/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <TelegramLogo className="size-8 sm:size-9 shrink-0" />
                        <span className="min-w-0 truncate">
                          <span className="block text-xs text-subtle truncate">
                            {tg.label || "Telegram Desk"} {tg.isPrimary && "· Primary"}
                          </span>
                          <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate font-mono">
                            {tg.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(tg.value, "Telegram copied.")
                        }
                        className="px-2.5 py-1 text-xs text-muted-foreground hover:text-label hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition shrink-0 cursor-pointer"
                        title="Copy Telegram"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}

                {/* Viber Lines */}
                {socialsGrouped.viber?.map((vb, idx) => (
                  <li key={`vb-${vb.id || idx}`}>
                    <div className="flex w-full items-center justify-between gap-3 px-5 py-3.5 hover:bg-fill transition-colors">
                      <a
                        href={vb.href || `viber://chat?number=${encodeURIComponent(vb.value)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <ViberLogo className="size-8 sm:size-9 shrink-0" />
                        <span className="min-w-0 truncate">
                          <span className="block text-xs text-subtle truncate">
                            {vb.label || "Viber Client Desk"} {vb.isPrimary && "· Primary"}
                          </span>
                          <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate font-mono">
                            {vb.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(vb.value.replace(/[^\d+]/g, ""), "Viber copied.")
                        }
                        className="px-2.5 py-1 text-xs text-muted-foreground hover:text-label hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition shrink-0 cursor-pointer"
                        title="Copy Viber"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}

                {/* Emails */}
                {socialsGrouped.email?.map((email, idx) => (
                  <li key={`email-${email.id || idx}`}>
                    <div className="flex w-full items-center justify-between gap-3 px-5 py-3.5 hover:bg-fill transition-colors">
                      <a
                        href={email.href || `mailto:${email.value}`}
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <GmailLogo className="size-8 sm:size-9 shrink-0" />
                        <span className="min-w-0 truncate">
                          <span className="block text-xs text-subtle truncate">
                            {email.label || "Email Inbox"} {email.isPrimary && "· Primary"}
                          </span>
                          <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate font-mono">
                            {email.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyText(email.value, "Email address copied.")}
                        className="px-2.5 py-1 text-xs text-muted-foreground hover:text-label hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition shrink-0 cursor-pointer"
                        title="Copy Email"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}

                {/* Physical Office Addresses */}
                {addresses?.map((addr, idx) => (
                  <li key={`addr-${addr.id || idx}`}>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(addr.fullAddress || `${addr.street}, ${addr.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-fill transition-colors"
                    >
                      <MapsLogo className="size-8 sm:size-9 shrink-0" />
                      <span className="min-w-0 truncate">
                        <span className="block text-xs text-subtle truncate">
                          {addr.label || (addr.city ? `${addr.city} Office` : "Office Location")} {addr.isPrimary && "· Primary HQ"}
                        </span>
                        <span className="mt-0.5 block text-[14px] sm:text-[15px] font-medium text-label truncate">
                          {addr.street} {addr.city ? `· ${addr.city}` : ""}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
                </ul>
              </div>

              <div className="shrink-0 flex flex-wrap items-center justify-center gap-3 border-t border-hairline px-5 py-3.5 bg-card">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="transition-transform duration-150 hover:scale-105"
                  >
                    <InstagramLogo className="size-9" />
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="transition-transform duration-150 hover:scale-105"
                  >
                    <FacebookLogo className="size-9" />
                  </a>
                )}
                {socialsGrouped.custom?.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href || s.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-label hover:bg-fill transition-colors"
                  >
                    {s.label || "Link"}
                  </a>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="surface-lift flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card">
              {live ? (
                <form
                  action="/send-mail.php"
                  method="post"
                  onSubmit={handleSubmit}
                  className="p-2"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />
                  <div className="divide-y divide-hairline rounded-lg bg-fill">
                    <label className="block px-5 py-4">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                        Name
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-base text-label outline-none placeholder:text-subtle"
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="block px-5 py-4">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                        Phone
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        maxLength={40}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-base text-label outline-none placeholder:text-subtle"
                        placeholder="+380 63 000 0000"
                        autoComplete="tel"
                      />
                    </label>
                    <label className="block px-5 py-4">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                        Email
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={255}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-base text-label outline-none placeholder:text-subtle"
                        placeholder="you@company.com"
                        autoComplete="email"
                        required
                      />
                    </label>

                    {config.contactForm?.showCompany !== false && (
                      <label className="block px-5 py-4">
                        <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                          Company / Brand (Optional)
                        </span>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          maxLength={120}
                          value={formData.company || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              company: e.target.value,
                            }))
                          }
                          className="w-full bg-transparent text-base text-label outline-none placeholder:text-subtle"
                          placeholder="e.g. Acme Corp or Retail Brand"
                        />
                      </label>
                    )}

                    {config.contactForm?.showServiceSelect !== false && (
                      <label className="block px-5 py-4">
                        <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                          Service Needed
                        </span>
                        <select
                          id="service"
                          name="service"
                          value={formData.service || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              service: e.target.value,
                            }))
                          }
                          className="w-full bg-transparent text-base text-label outline-none"
                        >
                          <option value="">Select a service focus...</option>
                          <option value="Custom Web Development & Storefronts">Custom Web Development & Storefronts</option>
                          <option value="Bespoke CRM & VoIP Calling Desks">Bespoke CRM & VoIP Calling Desks</option>
                          <option value="Paid Ad Campaigns & Acquisition">Paid Ad Campaigns & Acquisition</option>
                          <option value="Email Marketing & Automation Flows">Email Marketing & Automation Flows</option>
                          <option value="Brand Identity & Web Systems">Brand Identity & Web Systems</option>
                        </select>
                      </label>
                    )}

                    {(config.contactForm?.showBudget !== false || config.contactForm?.showTimeline !== false) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
                        {config.contactForm?.showBudget !== false && (
                          <label className="block px-5 py-4">
                            <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                              Budget Range
                            </span>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  budget: e.target.value,
                                }))
                              }
                              className="w-full bg-transparent text-sm text-label outline-none"
                            >
                              <option value="">Select budget...</option>
                              <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                              <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                              <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                              <option value="$25,000+">$25,000+ Enterprise</option>
                            </select>
                          </label>
                        )}
                        {config.contactForm?.showTimeline !== false && (
                          <label className="block px-5 py-4">
                            <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                              Target Timeline
                            </span>
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  timeline: e.target.value,
                                }))
                              }
                              className="w-full bg-transparent text-sm text-label outline-none"
                            >
                              <option value="">Select timeline...</option>
                              <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                              <option value="1 month">1 month</option>
                              <option value="2 – 3 months">2 – 3 months</option>
                              <option value="Flexible">Flexible / Planning</option>
                            </select>
                          </label>
                        )}
                      </div>
                    )}

                    <label className="block px-5 py-4">
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-subtle uppercase">
                        Message
                      </span>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="w-full resize-none bg-transparent text-base text-label outline-none placeholder:text-subtle"
                        placeholder="Site rebuild, new brand, social campaigns — what's the job?"
                        required
                      />
                    </label>
                  </div>
                  <div className="p-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="h-96" aria-hidden="true" />
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-6">
          <article className="map-frame surface-lift relative overflow-hidden rounded-xl bg-muted">
            <iframe
              title="Codex Dynamics office — Sportyvna, 1A, Kyiv"
              src={LINKS.mapsEmbed}
              className="relative z-10 h-[22rem] w-full border-0 sm:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-card pointer-events-auto absolute bottom-4 right-4 z-20 max-w-[min(calc(100%-2rem),22rem)] rounded-xl p-4 sm:bottom-5 sm:right-5">
              <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
                Kyiv Office
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-label">
                {CONTACT.addressStreet}
              </p>
              <p className="text-sm text-muted-foreground">
                {CONTACT.addressCity}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={LINKS.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full bg-blue px-4 text-sm font-medium text-paper hover:bg-blue-hover"
                >
                  Directions
                </a>
                <a
                  href={LINKS.mapsApple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full bg-fill px-4 text-sm font-medium text-label hover:bg-muted"
                >
                  Apple Maps
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

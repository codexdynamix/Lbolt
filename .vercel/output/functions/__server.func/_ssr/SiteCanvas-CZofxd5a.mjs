import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as LinkedInLogo, d as ViberLogo, f as WhatsAppLogo, i as InstagramLogo, l as TelegramLogo, m as useSiteConfig, n as GitHubLogo, p as cn, r as GmailLogo, s as PhoneLogo, t as FacebookLogo, u as TwitterXLogo } from "./BrandMarks-YUoSebnV.mjs";
import { i as hrefToPreviewPage, n as buildThemeStyle } from "./theme-engine-rY8KTBOg.mjs";
import { Pt as CircleCheck, Qt as ArrowRight, U as MessageSquare, W as Menu, X as LoaderCircle, n as X, q as Mail, v as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { i as LINKS, n as useContactModal, r as CONTACT } from "./router-8c-Mh_7h.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteCanvas-CZofxd5a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-[background-color,color,opacity,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-blue text-paper hover:bg-blue-hover",
			inverted: "bg-paper text-ink hover:bg-paper/90",
			ghost: "bg-transparent text-blue hover:opacity-70",
			outline: "bg-transparent text-foreground shadow-[inset_0_0_0_1px_var(--color-border)] hover:bg-muted",
			dark: "bg-ink text-paper hover:bg-label"
		},
		size: {
			default: "min-h-11 rounded-full px-5 text-base",
			sm: "min-h-10 rounded-full px-4 text-sm",
			lg: "min-h-12 rounded-full px-6 text-base",
			icon: "size-11 rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var _jsxFileName$5 = "/app/applet/src/components/ui/button.tsx";
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
var NAV_LINKS = [
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#work",
		label: "Projects"
	},
	{
		href: "#process",
		label: "Process"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#reviews",
		label: "Reviews"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function scrollToId(id) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
var PreviewModeContext = (0, import_react.createContext)({
	isPreview: false,
	currentPage: "home"
});
function usePreviewMode() {
	return (0, import_react.useContext)(PreviewModeContext);
}
var _jsxFileName$4 = "/app/applet/src/components/Nav.tsx";
function Mark({ letter, logoUrl }) {
	if (logoUrl) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
		src: logoUrl,
		alt: "Logo",
		className: "size-7 object-contain rounded-[6px]"
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 28,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "relative flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-blue text-paper shadow-[inset_0_0.5px_0_rgb(255_255_255_/_0.35)]",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-[13px] leading-none font-semibold tracking-tight",
			children: letter || "C"
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 40,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
function HeaderSocials({ className, headerSocials, fallbackSocials }) {
	const visible = [
		{
			key: "linkedin",
			enabled: headerSocials?.linkedin !== void 0 ? Boolean(headerSocials.linkedin.enabled) : true,
			url: headerSocials?.linkedin?.url || fallbackSocials?.linkedin || LINKS.linkedin,
			label: "LinkedIn",
			logo: LinkedInLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "x",
			enabled: headerSocials?.x !== void 0 ? Boolean(headerSocials.x.enabled) : true,
			url: headerSocials?.x?.url || fallbackSocials?.twitter || LINKS.twitter,
			label: "Twitter / X",
			logo: TwitterXLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "github",
			enabled: headerSocials?.github !== void 0 ? Boolean(headerSocials.github.enabled) : true,
			url: headerSocials?.github?.url || fallbackSocials?.github || LINKS.github,
			label: "GitHub",
			logo: GitHubLogo,
			iconClass: "size-5 sm:size-6"
		},
		{
			key: "instagram",
			enabled: headerSocials?.instagram !== void 0 ? Boolean(headerSocials.instagram.enabled) : true,
			url: headerSocials?.instagram?.url || fallbackSocials?.instagram || LINKS.instagram,
			label: "Instagram",
			logo: InstagramLogo,
			iconClass: "size-6 sm:size-7"
		},
		{
			key: "facebook",
			enabled: headerSocials?.facebook !== void 0 ? Boolean(headerSocials.facebook.enabled) : true,
			url: headerSocials?.facebook?.url || fallbackSocials?.facebook || LINKS.facebook,
			label: "Facebook",
			logo: FacebookLogo,
			iconClass: "size-6 sm:size-7"
		}
	].filter((item) => item.enabled && item.url);
	if (visible.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("flex items-center gap-0.5 sm:gap-1", className),
		children: visible.map((item) => {
			const LogoComponent = item.logo;
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
				href: item.url,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": item.label,
				title: item.label,
				className: "flex size-8 sm:size-9 items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoComponent, { className: item.iconClass }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 122,
					columnNumber: 13
				}, this)
			}, item.key, false, {
				fileName: _jsxFileName$4,
				lineNumber: 113,
				columnNumber: 11
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 109,
		columnNumber: 5
	}, this);
}
function Nav() {
	const { config, primaryPhone, primaryEmail, primaryAddress, primaryWhatsApp, primaryTelegram, primaryViber, socialsGrouped } = useSiteConfig();
	const brandName = config.siteName || "Codex";
	const brandInitial = brandName.trim()[0]?.toUpperCase() || "C";
	const phoneDisplay = primaryPhone?.value || CONTACT.phoneDisplay;
	const phoneHref = primaryPhone?.href || LINKS.tel;
	const emailRecipient = config.formSubmitEmail || primaryEmail?.value || CONTACT.email;
	const currentAddress = primaryAddress || {
		street: CONTACT.addressStreet,
		city: "Kyiv"
	};
	const whatsappHref = primaryWhatsApp?.href || LINKS.whatsapp;
	const telegramHref = primaryTelegram?.href || LINKS.telegram;
	const viberHref = primaryViber?.href || LINKS.viber;
	const instagramHref = config.headerSocials?.instagram?.url || socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookHref = config.headerSocials?.facebook?.url || socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const linkedinHref = config.headerSocials?.linkedin?.url || socialsGrouped.linkedin?.[0]?.href || LINKS.linkedin;
	const twitterHref = config.headerSocials?.x?.url || socialsGrouped.twitter?.[0]?.href || LINKS.twitter;
	const githubHref = config.headerSocials?.github?.url || socialsGrouped.github?.[0]?.href || LINKS.github;
	const { openContactModal } = useContactModal();
	const preview = usePreviewMode();
	const [overLight, setOverLight] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const onNavHref = (href) => (e) => {
		if (preview.isPreview && preview.navigateTo) {
			e.preventDefault();
			preview.navigateTo(hrefToPreviewPage(href));
			setOpen(false);
		}
	};
	const pin = preview.isPreview ? "absolute" : "fixed";
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const hero = document.getElementById("hero");
			if (hero) setOverLight(hero.getBoundingClientRect().bottom < 88);
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			setProgress(max > 0 ? doc.scrollTop / max : 0);
			setScrolled(window.scrollY > 8);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const light = overLight && !open;
	const headerStyle = config.theme?.headerStyle || "floating";
	if (headerStyle === "classic") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 border-b border-hairline bg-background/95 backdrop-blur-xl", pin),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pointer-events-auto mx-auto w-full max-w-[72rem] px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center py-5 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "text-[1.35rem] font-semibold tracking-tight text-label font-display",
					children: brandName
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 210,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-[11px] tracking-[0.22em] text-subtle uppercase",
					children: config.siteTagline || "Digital Agency"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 217,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 209,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "flex items-center justify-center gap-1 border-t border-hairline py-2",
				"aria-label": "Primary",
				children: [NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: item.href,
					onClick: onNavHref(item.href),
					className: "rounded-full px-3 py-2 text-[12px] font-medium text-label/80 hover:text-label",
					children: item.label
				}, item.href, false, {
					fileName: _jsxFileName$4,
					lineNumber: 223,
					columnNumber: 15
				}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => openContactModal(),
					className: "ml-2 rounded-full bg-label px-3.5 py-1.5 text-[12px] font-semibold text-paper",
					children: "Talk to us"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 232,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 221,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 208,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 207,
		columnNumber: 7
	}, this);
	if (headerStyle === "sticky") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-2xl", pin, scrolled && "shadow-xs"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "pointer-events-auto mx-auto flex h-14 w-full max-w-[80rem] items-center justify-between px-4 sm:px-6",
			"aria-label": "Primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mark, {
						letter: brandInitial,
						logoUrl: config.branding?.logoLight || config.branding?.logoDark
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 254,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[14px] font-semibold tracking-tight text-label",
						children: brandName
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 255,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 249,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: item.href,
						onClick: onNavHref(item.href),
						className: "rounded-full px-3 py-1.5 text-[13px] font-medium text-label/80 hover:bg-black/5",
						children: item.label
					}, item.href, false, {
						fileName: _jsxFileName$4,
						lineNumber: 259,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 257,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						size: "sm",
						className: "hidden h-8 px-3.5 text-[13px] md:inline-flex",
						onClick: () => openContactModal(),
						children: "Talk to us"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 270,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "lg:hidden size-10",
						onClick: () => setOpen((v) => !v),
						"aria-label": "Menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 279,
							columnNumber: 23
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 279,
							columnNumber: 50
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 278,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 269,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 248,
			columnNumber: 9
		}, this), open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pointer-events-auto border-t border-hairline bg-background px-4 py-4 lg:hidden",
			children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
				href: item.href,
				onClick: onNavHref(item.href),
				className: "block py-2.5 text-sm font-medium text-label",
				children: item.label
			}, item.href, false, {
				fileName: _jsxFileName$4,
				lineNumber: 286,
				columnNumber: 15
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 284,
			columnNumber: 11
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 247,
		columnNumber: 7
	}, this);
	if (headerStyle === "minimal") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50", pin),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "pointer-events-auto mx-auto flex h-12 w-full max-w-[56rem] items-center justify-between px-5",
			"aria-label": "Primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					className: "text-[13px] font-semibold tracking-tight text-label",
					children: brandName
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 305,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden items-center gap-5 sm:flex",
					children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: item.href,
						onClick: onNavHref(item.href),
						className: "text-[12px] font-medium text-muted-foreground hover:text-label",
						children: item.label
					}, item.href, false, {
						fileName: _jsxFileName$4,
						lineNumber: 314,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 312,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => openContactModal(),
					className: "text-[12px] font-semibold text-primary",
					children: "Contact"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 324,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 304,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-full bg-hairline" }, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 332,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 303,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("pointer-events-none inset-x-0 top-0 z-50 pt-[max(0.7rem,env(safe-area-inset-top))]", pin),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("flex justify-center", headerStyle === "minimal" ? "px-4" : "px-3 sm:px-5 xl:px-8"),
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: cn("ios-island pointer-events-auto relative z-50 flex h-12 w-full items-center justify-between gap-2 px-2 transition-[background-color,box-shadow,backdrop-filter,transform] duration-300 sm:h-[3.25rem] sm:px-2.5", headerStyle === "minimal" ? "max-w-[50rem]" : "max-w-[72rem]", light ? "ios-island-light text-label" : "ios-island-dark text-paper", scrolled && "ios-island-scrolled", open && "ios-island-open"),
				"aria-label": "Primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							setOpen(false);
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						className: "flex min-h-11 items-center gap-2 rounded-full py-1 pr-2 pl-0.5",
						"aria-label": `${brandName} home`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mark, {
							letter: brandInitial,
							logoUrl: config.branding?.logoLight || config.branding?.logoDark
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 360,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[13px] font-semibold tracking-tight",
							children: brandName
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 361,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 351,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
						children: NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: item.href,
							onClick: onNavHref(item.href),
							className: cn("rounded-full px-3 py-1.5 text-[13px] font-medium transition-opacity duration-150 hover:opacity-55", light ? "text-label" : "text-paper/90"),
							children: item.label
						}, item.href, false, {
							fileName: _jsxFileName$4,
							lineNumber: 368,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 366,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeaderSocials, {
								headerSocials: config.headerSocials,
								fallbackSocials: {
									instagram: instagramHref,
									facebook: facebookHref,
									linkedin: linkedinHref,
									twitter: twitterHref,
									github: githubHref
								}
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 383,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								size: "sm",
								variant: light ? "default" : "inverted",
								className: "hidden h-8 min-h-8 px-3.5 text-[13px] md:inline-flex cursor-pointer shadow-xs",
								onClick: () => {
									setOpen(false);
									openContactModal();
								},
								children: "Talk to us"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 393,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setOpen((v) => !v),
								className: cn("relative z-20 flex size-10 items-center justify-center rounded-full md:hidden", light ? "text-label" : "text-paper"),
								"aria-label": open ? "Close menu" : "Open menu",
								"aria-expanded": open,
								children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 416,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 416,
									columnNumber: 50
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 406,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 382,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: cn("pointer-events-none absolute inset-x-4 bottom-1 h-px origin-left rounded-full", light ? "bg-label/20" : "bg-paper/25"),
						style: { transform: `scaleX(${progress})` },
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 420,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 341,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 340,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: -8,
				filter: "blur(8px)"
			},
			animate: {
				opacity: 1,
				y: 0,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				y: -6,
				filter: "blur(6px)"
			},
			transition: {
				duration: .28,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "ios-sheet pointer-events-auto fixed inset-0 z-40 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-full flex-col px-6 pt-24 pb-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-1 flex-col justify-center gap-1",
					children: NAV_LINKS.map((item, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.a, {
						href: item.href,
						initial: {
							opacity: 0,
							y: 12,
							filter: "blur(4px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							delay: .05 * i,
							duration: .4
						},
						onClick: (e) => {
							onNavHref(item.href)(e);
							setOpen(false);
						},
						className: "py-3 text-4xl font-semibold tracking-tight text-paper",
						children: item.label
					}, item.href, false, {
						fileName: _jsxFileName$4,
						lineNumber: 444,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 442,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: whatsappHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "WhatsApp",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WhatsAppLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 469,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 463,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: telegramHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Telegram",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TelegramLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 477,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 471,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: viberHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Viber",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ViberLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 485,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 479,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: phoneHref,
									"aria-label": "Call",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PhoneLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 488,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 487,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailRecipient)}`,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Gmail",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GmailLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 496,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 490,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: linkedinHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "LinkedIn",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinkedInLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 504,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 498,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: twitterHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Twitter / X",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TwitterXLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 512,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 506,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: githubHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "GitHub",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitHubLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 520,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 514,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: instagramHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Instagram",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InstagramLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 528,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 522,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: facebookHref,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Facebook",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FacebookLogo, { className: "size-11" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 536,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 530,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 462,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-paper/70",
							children: [
								phoneDisplay,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mx-2 text-paper/30",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 542,
									columnNumber: 19
								}, this),
								currentAddress.street,
								", ",
								currentAddress.city
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 540,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							size: "lg",
							variant: "inverted",
							className: "w-full cursor-pointer shadow-md",
							onClick: () => {
								setOpen(false);
								openContactModal();
							},
							children: "Talk to us"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 545,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 461,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 441,
				columnNumber: 13
			}, this)
		}, "menu", false, {
			fileName: _jsxFileName$4,
			lineNumber: 433,
			columnNumber: 11
		}, this) : null }, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 431,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 338,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/NewsletterSignup.tsx";
function NewsletterSignup({ title = "Codex Engineering Digest", description = "Architecture deep dives, performance benchmarks, and bespoke design systems delivered bi-weekly. Zero noise.", className, variant = "card", source = "newsletter_signup", placeholder = "Enter your work email...", buttonText = "Subscribe" }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSubscribed, setIsSubscribed] = (0, import_react.useState)(false);
	const validateEmail = (val) => {
		const trimmed = val.trim();
		if (!trimmed) {
			setError("Please enter your email address.");
			return false;
		}
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
			setError("Please provide a valid email format (e.g. alex@company.com).");
			return false;
		}
		setError(null);
		return true;
	};
	const handleInputChange = (e) => {
		const val = e.target.value;
		setEmail(val);
		if (error) validateEmail(val);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) return;
		try {
			setIsSubmitting(true);
			setError(null);
			const res = await fetch("/api/crm/action", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "create_lead",
					name: "Newsletter Subscriber",
					email: email.trim(),
					company: "",
					source,
					status: "new",
					score: 65,
					notes: `Subscribed via ${source} at ${(/* @__PURE__ */ new Date()).toLocaleString()}`
				})
			});
			try {
				const raw = localStorage.getItem("codex-newsletter-subscribers");
				const list = raw ? JSON.parse(raw) : [];
				list.push({
					email: email.trim(),
					date: (/* @__PURE__ */ new Date()).toISOString(),
					source
				});
				localStorage.setItem("codex-newsletter-subscribers", JSON.stringify(list));
			} catch {}
			if ((await res.json().catch(() => ({ ok: true }))).ok || res.ok) {
				setIsSubscribed(true);
				toast.success("You're on the list! Welcome to Codex Dynamics briefings.");
			} else toast.error("Subscription could not be processed. Please try again.");
		} catch {
			setIsSubscribed(true);
			toast.success("Subscribed successfully!");
		} finally {
			setIsSubmitting(false);
		}
	};
	if (isSubscribed) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("rounded-3xl border border-blue/20 bg-blue/5 p-6 text-center animate-in fade-in duration-300", variant === "footer" ? "p-4 bg-transparent border-hairline" : "", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-center gap-2 text-blue font-semibold text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 118,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "You're subscribed!" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 119,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 117,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"A confirmation dispatch has been logged for ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-label font-medium",
						children: email
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 122,
						columnNumber: 55
					}, this),
					"."
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 121,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => {
					setIsSubscribed(false);
					setEmail("");
				},
				className: "mt-3 text-[11px] text-blue underline hover:text-blue-hover cursor-pointer",
				children: "Subscribe another email"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 124,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 110,
		columnNumber: 7
	}, this);
	if (variant === "footer") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
			className: "text-xs font-semibold tracking-wider text-label uppercase flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-blue" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 144,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Studio Newsletter" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 145,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 143,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-1 text-xs text-muted-foreground leading-relaxed",
			children: "Quarterly engineering blueprints and design systems."
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 147,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 142,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit,
			className: "space-y-2",
			noValidate: true,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "email",
					value: email,
					onChange: handleInputChange,
					placeholder,
					"aria-label": "Email address for newsletter",
					disabled: isSubmitting,
					className: cn("w-full h-10 rounded-xl bg-paper px-3.5 pr-24 text-xs text-label border transition-colors outline-none", error ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-hairline hover:border-black/20 dark:hover:border-white/20 focus:border-blue focus:ring-1 focus:ring-blue")
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 154,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: isSubmitting,
					className: "absolute right-1 h-8 px-3 rounded-lg bg-blue hover:bg-blue-hover text-white text-[11px] font-medium transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer",
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 174,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: buttonText }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 177,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 178,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 176,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 168,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 153,
				columnNumber: 11
			}, this), error && /* @__PURE__ */ (void 0)("p", {
				className: "text-[11px] text-destructive flex items-center gap-1 animate-in fade-in duration-150",
				children: /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 186,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 185,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 152,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 141,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(variant === "card" ? "p-6 sm:p-8 rounded-3xl bg-card border border-hairline shadow-xs relative overflow-hidden" : "p-4 rounded-2xl bg-card/60 border border-hairline", className),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue/10 text-blue text-[11px] font-semibold border border-blue/15 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 206,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Private Dispatch" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 207,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 205,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg sm:text-xl font-bold text-label font-display tracking-tight",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 210,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed",
					children: description
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 213,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSubmit,
					className: "mt-5 space-y-2",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col sm:flex-row gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex-1",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "email",
									value: email,
									onChange: handleInputChange,
									placeholder,
									"aria-label": "Email address for newsletter",
									disabled: isSubmitting,
									className: cn("w-full h-11 rounded-2xl bg-paper px-4 text-xs sm:text-sm text-label border transition-all outline-none", error ? "border-destructive ring-1 ring-destructive" : "border-hairline hover:border-black/20 dark:hover:border-white/20 focus:border-blue focus:ring-2 focus:ring-blue/20")
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 220,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 219,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "h-11 px-6 rounded-2xl bg-blue hover:bg-blue-hover text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer shrink-0",
								children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 242,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Subscribing..." }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 243,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 241,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: buttonText }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 247,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 248,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 246,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 235,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 218,
							columnNumber: 11
						}, this),
						error && /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-destructive pt-1 flex items-center gap-1",
							children: /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 256,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 255,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-subtle pt-1",
							children: "No spam. We respect your privacy and never share your data. Unsubscribe with one click."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 260,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 217,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 204,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 196,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/Footer.tsx";
function Footer() {
	const { config, primaryPhone, primaryEmail, primaryAddress, primaryWhatsApp, primaryTelegram, primaryViber, socialsGrouped, addresses } = useSiteConfig();
	const { openContactModal } = useContactModal();
	const year = config.copyrightYear || (/* @__PURE__ */ new Date()).getFullYear().toString();
	const brandName = config.siteName || "CODEX";
	const bio = config.footer?.tagline || "Web development, web design, and social media marketing. We build the site, then we grow it.";
	const phoneItem = primaryPhone || {
		value: CONTACT.phoneDisplay,
		href: LINKS.tel
	};
	const emailItem = primaryEmail || {
		value: CONTACT.email,
		href: LINKS.mailto
	};
	const addressItem = primaryAddress || {
		id: "addr-kyiv",
		label: "Kyiv Office",
		city: "Kyiv",
		street: CONTACT.addressStreet,
		fullAddress: CONTACT.addressFull,
		lat: 50.4385,
		lng: 30.5235
	};
	const whatsappUrl = primaryWhatsApp?.href || LINKS.whatsapp;
	const telegramUrl = primaryTelegram?.href || LINKS.telegram;
	const viberUrl = primaryViber?.href || LINKS.viber;
	const instagramUrl = config.headerSocials?.instagram?.url || socialsGrouped.instagram?.[0]?.href || LINKS.instagram;
	const facebookUrl = config.headerSocials?.facebook?.url || socialsGrouped.facebook?.[0]?.href || LINKS.facebook;
	const linkedinUrl = config.headerSocials?.linkedin?.url || socialsGrouped.linkedin?.[0]?.href || LINKS.linkedin;
	const twitterUrl = config.headerSocials?.x?.url || socialsGrouped.twitter?.[0]?.href || LINKS.twitter;
	const githubUrl = config.headerSocials?.github?.url || socialsGrouped.github?.[0]?.href || LINKS.github;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "border-t border-hairline bg-background py-14 pb-28 text-sm text-muted-foreground sm:py-16 sm:pb-28",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "shell",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-12 lg:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[13px] font-semibold tracking-[0.2em] text-label uppercase",
								children: brandName
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 68,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "max-w-sm leading-relaxed text-xs sm:text-sm",
								children: bio
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 71,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-label mb-2",
									children: "Direct Channels"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 77,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										whatsappUrl && /* @__PURE__ */ (void 0)("a", {
											href: whatsappUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "WhatsApp",
											className: "hover:scale-105 transition-transform",
											title: "WhatsApp",
											children: /* @__PURE__ */ (void 0)(WhatsAppLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 90,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 82,
											columnNumber: 19
										}, this),
										telegramUrl && /* @__PURE__ */ (void 0)("a", {
											href: telegramUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Telegram",
											className: "hover:scale-105 transition-transform",
											title: "Telegram",
											children: /* @__PURE__ */ (void 0)(TelegramLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 102,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 94,
											columnNumber: 19
										}, this),
										viberUrl && /* @__PURE__ */ (void 0)("a", {
											href: viberUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Viber",
											className: "hover:scale-105 transition-transform",
											title: "Viber",
											children: /* @__PURE__ */ (void 0)(ViberLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 114,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 106,
											columnNumber: 19
										}, this),
										phoneItem.href && /* @__PURE__ */ (void 0)("a", {
											href: phoneItem.href,
											"aria-label": "Call",
											className: "hover:scale-105 transition-transform",
											title: "Call",
											children: /* @__PURE__ */ (void 0)(PhoneLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 124,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 118,
											columnNumber: 19
										}, this),
										emailItem.value && /* @__PURE__ */ (void 0)("a", {
											href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailItem.value)}`,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Gmail",
											className: "hover:scale-105 transition-transform",
											title: "Gmail",
											children: /* @__PURE__ */ (void 0)(GmailLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 136,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 128,
											columnNumber: 19
										}, this),
										instagramUrl && /* @__PURE__ */ (void 0)("a", {
											href: instagramUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Instagram",
											className: "hover:scale-105 transition-transform",
											title: "Instagram",
											children: /* @__PURE__ */ (void 0)(InstagramLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 148,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 140,
											columnNumber: 19
										}, this),
										facebookUrl && /* @__PURE__ */ (void 0)("a", {
											href: facebookUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Facebook",
											className: "hover:scale-105 transition-transform",
											title: "Facebook",
											children: /* @__PURE__ */ (void 0)(FacebookLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 160,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 152,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 80,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 76,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 border-t border-hairline",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] font-semibold uppercase tracking-wider text-label mb-2",
									children: "Professional & Open Source"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 168,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: linkedinUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "LinkedIn",
											title: "Codex Dynamics on LinkedIn",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinkedInLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 180,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 172,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: twitterUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "Twitter / X",
											title: "Codex Dynamics on Twitter",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TwitterXLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 190,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 182,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: githubUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": "GitHub",
											title: "Codex Dynamics on GitHub",
											className: "size-8 rounded-full hover:scale-110 active:scale-95 transition-transform flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitHubLogo, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 200,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 192,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 171,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 167,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 67,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mb-4 font-medium text-label",
							children: "Company"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 208,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#process",
									className: "hover:text-label transition-colors",
									children: "Process"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 211,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 210,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#capabilities",
									className: "hover:text-label transition-colors",
									children: "Capabilities"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 216,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 215,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#about",
									className: "hover:text-label transition-colors",
									children: "About"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 221,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 220,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "/blog",
									className: "hover:text-label transition-colors font-medium text-blue",
									children: "Blog & Insights"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 226,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 225,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 209,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 207,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mb-4 font-medium text-label",
							children: "Work & Inquiries"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 234,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#work",
									className: "hover:text-label transition-colors",
									children: "Selected work"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 237,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 236,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#results",
									className: "hover:text-label transition-colors",
									children: "Results"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 242,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 241,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => openContactModal("High-Performance Website"),
									className: "hover:text-label transition-colors cursor-pointer text-left text-blue font-medium",
									children: "Start a project"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 247,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 246,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => openContactModal("General Inquiry"),
									className: "hover:text-label transition-colors cursor-pointer text-left flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 261,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Contact Us" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 262,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 256,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 255,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 235,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 233,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NewsletterSignup, {
							variant: "footer",
							source: "footer_subscription",
							placeholder: "Your email address..."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 270,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2 border-t border-hairline",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mb-2 font-medium text-label text-xs",
								children: "Direct Desk"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 277,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "space-y-1.5 text-xs",
								children: [
									socialsGrouped.phone?.map((p, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: p.href || `tel:${p.value}`,
										className: "hover:text-label transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [p.label || "Phone", ":"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 282,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-label",
											children: p.value
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 283,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 281,
										columnNumber: 21
									}, this) }, `phone-${p.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 280,
										columnNumber: 19
									}, this)),
									socialsGrouped.whatsapp?.map((w, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: w.href || `https://wa.me/${w.value.replace(/[^0-9]/g, "")}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-label transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [w.label || "WhatsApp", ":"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 290,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-label",
											children: w.value
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 291,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 289,
										columnNumber: 21
									}, this) }, `wa-${w.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 288,
										columnNumber: 19
									}, this)),
									socialsGrouped.telegram?.map((t, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: t.href || `https://t.me/${t.value.replace(/^@/, "")}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-label transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [t.label || "Telegram", ":"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 298,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-label",
											children: t.value
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 299,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 297,
										columnNumber: 21
									}, this) }, `tg-${t.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 296,
										columnNumber: 19
									}, this)),
									socialsGrouped.viber?.map((v, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: v.href || `viber://chat?number=${encodeURIComponent(v.value)}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-label transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [v.label || "Viber", ":"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 306,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-label",
											children: v.value
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 307,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 305,
										columnNumber: 21
									}, this) }, `vb-${v.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 304,
										columnNumber: 19
									}, this)),
									socialsGrouped.email?.map((e, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: e.href || `mailto:${e.value}`,
										className: "hover:text-label transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [e.label || "Email", ":"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 314,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-label",
											children: e.value
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 315,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 313,
										columnNumber: 21
									}, this) }, `email-${e.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 312,
										columnNumber: 19
									}, this)),
									addresses?.map((addr, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `https://maps.google.com/?q=${encodeURIComponent(addr.fullAddress || `${addr.street}, ${addr.city}`)}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "hover:text-label transition-colors",
										children: [addr.label ? `${addr.label}: ` : addr.city ? `${addr.city} · ` : "", addr.street]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 321,
										columnNumber: 21
									}, this) }, `addr-${addr.id || idx}`, false, {
										fileName: _jsxFileName$2,
										lineNumber: 320,
										columnNumber: 19
									}, this))
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 278,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 276,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 269,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 65,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 flex flex-col justify-between items-center gap-4 border-t border-hairline pt-7 text-xs sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: config.footer?.copyrightText ? config.footer.copyrightText.replace("{year}", String(year)) : `© ${year} ${brandName}. All rights reserved.` }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 338,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => openContactModal(),
							className: "text-xs text-blue hover:text-blue-hover font-medium underline underline-offset-4 cursor-pointer",
							children: "Contact Us"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 345,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 344,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
						addressItem.city,
						" · ",
						addressItem.street
					] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 354,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 337,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 63,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 62,
		columnNumber: 5
	}, this);
}
var DEFAULT_SITE_NAME = "Codex Dynamics";
var DEFAULT_TITLE = "Codex Dynamics — High-Performance Websites & Digital Studio";
var DEFAULT_DESCRIPTION = "High-performance websites, web design, web development, and digital marketing studio. Precision engineering on every screen.";
var DEFAULT_OG_IMAGE = "/hero/studio.jpg";
/**
* SEO component managing document head tags including title, meta descriptions,
* Open Graph, Twitter Cards, canonical links, and Schema.org JSON-LD.
* Acts as a reactive lightweight Head manager (pure React 19 + DOM reconciliation).
*/
function SEO({ title, description, canonical, ogType = "website", ogImage, articleAuthor = DEFAULT_SITE_NAME, articlePublishedTime, articleModifiedTime, articleSection, articleTags, twitterCard = "summary_large_image", keywords, schemaOrg, noIndex = false }) {
	const { config } = useSiteConfig();
	const siteName = config.siteName || DEFAULT_SITE_NAME;
	const configTitle = config.seo?.metaTitle || DEFAULT_TITLE;
	const configDesc = config.seo?.metaDescription || DEFAULT_DESCRIPTION;
	const configOgImage = config.seo?.ogImage || DEFAULT_OG_IMAGE;
	const configCanonical = config.seo?.canonicalUrl;
	const finalTitle = title ? `${title} — ${siteName}` : configTitle;
	const finalDescription = description || configDesc;
	const finalOgImage = ogImage || configOgImage;
	const finalCanonical = canonical || configCanonical;
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.title = finalTitle;
		const setMeta = (selector, attributeName, attributeValue, content) => {
			let el = document.head.querySelector(selector);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(attributeName, attributeValue);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};
		const setLink = (rel, href) => {
			let el = document.head.querySelector(`link[rel="${rel}"]`);
			if (!el) {
				el = document.createElement("link");
				el.setAttribute(rel, rel);
				document.head.appendChild(el);
			}
			el.setAttribute("href", href);
		};
		const removeMeta = (selector) => {
			const el = document.head.querySelector(selector);
			if (el) el.remove();
		};
		if (config.branding?.favicon) setLink("icon", config.branding.favicon);
		if (config.seo?.gscVerification) setMeta("meta[name=\"google-site-verification\"]", "name", "google-site-verification", config.seo.gscVerification);
		if (config.seo?.gaId && !document.getElementById("ga4-script")) {
			const gaScript = document.createElement("script");
			gaScript.id = "ga4-script";
			gaScript.async = true;
			gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.seo.gaId}`;
			document.head.appendChild(gaScript);
			const gaInit = document.createElement("script");
			gaInit.id = "ga4-init";
			gaInit.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.seo.gaId}');`;
			document.head.appendChild(gaInit);
		}
		const pixelId = config.seo?.metaPixelId || config.seo?.pixelId;
		if (pixelId && !document.getElementById("meta-pixel-script")) {
			const fbScript = document.createElement("script");
			fbScript.id = "meta-pixel-script";
			fbScript.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
			document.head.appendChild(fbScript);
			const noScript = document.createElement("noscript");
			noScript.id = "meta-pixel-noscript";
			const img = document.createElement("img");
			img.height = 1;
			img.width = 1;
			img.style.display = "none";
			img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
			noScript.appendChild(img);
			document.head.appendChild(noScript);
		}
		setMeta("meta[name=\"description\"]", "name", "description", finalDescription);
		if (keywords && keywords.length > 0) setMeta("meta[name=\"keywords\"]", "name", "keywords", keywords.join(", "));
		else removeMeta("meta[name=\"keywords\"]");
		if (noIndex) setMeta("meta[name=\"robots\"]", "name", "robots", "noindex, nofollow");
		else setMeta("meta[name=\"robots\"]", "name", "robots", "index, follow, max-image-preview:large");
		const currentUrl = finalCanonical || (typeof window !== "undefined" ? window.location.href : "");
		if (currentUrl) setLink("canonical", currentUrl);
		setMeta("meta[property=\"og:site_name\"]", "property", "og:site_name", siteName);
		setMeta("meta[property=\"og:title\"]", "property", "og:title", title || configTitle);
		setMeta("meta[property=\"og:description\"]", "property", "og:description", finalDescription);
		setMeta("meta[property=\"og:type\"]", "property", "og:type", ogType);
		if (currentUrl) setMeta("meta[property=\"og:url\"]", "property", "og:url", currentUrl);
		if (finalOgImage) setMeta("meta[property=\"og:image\"]", "property", "og:image", finalOgImage.startsWith("http") ? finalOgImage : `${window.location.origin}${finalOgImage.startsWith("/") ? "" : "/"}${finalOgImage}`);
		if (ogType === "article") {
			setMeta("meta[property=\"article:author\"]", "property", "article:author", articleAuthor);
			if (articlePublishedTime) setMeta("meta[property=\"article:published_time\"]", "property", "article:published_time", articlePublishedTime);
			if (articleModifiedTime) setMeta("meta[property=\"article:modified_time\"]", "property", "article:modified_time", articleModifiedTime);
			if (articleSection) setMeta("meta[property=\"article:section\"]", "property", "article:section", articleSection);
			if (articleTags && articleTags.length > 0) setMeta("meta[property=\"article:tag\"]", "property", "article:tag", articleTags.join(", "));
		} else {
			removeMeta("meta[property=\"article:author\"]");
			removeMeta("meta[property=\"article:published_time\"]");
			removeMeta("meta[property=\"article:modified_time\"]");
			removeMeta("meta[property=\"article:section\"]");
			removeMeta("meta[property=\"article:tag\"]");
		}
		setMeta("meta[name=\"twitter:card\"]", "name", "twitter:card", twitterCard);
		setMeta("meta[name=\"twitter:title\"]", "name", "twitter:title", title || configTitle);
		setMeta("meta[name=\"twitter:description\"]", "name", "twitter:description", finalDescription);
		if (finalOgImage) setMeta("meta[name=\"twitter:image\"]", "name", "twitter:image", finalOgImage.startsWith("http") ? finalOgImage : `${window.location.origin}${finalOgImage.startsWith("/") ? "" : "/"}${finalOgImage}`);
		const scriptId = "seo-schema-jsonld";
		let scriptEl = document.getElementById(scriptId);
		if (schemaOrg) {
			if (!scriptEl) {
				scriptEl = document.createElement("script");
				scriptEl.id = scriptId;
				scriptEl.type = "application/ld+json";
				document.head.appendChild(scriptEl);
			}
			scriptEl.textContent = JSON.stringify(schemaOrg);
		} else if (scriptEl) scriptEl.remove();
		return () => {
			document.title = DEFAULT_TITLE;
		};
	}, [
		finalTitle,
		title,
		finalDescription,
		finalCanonical,
		ogType,
		finalOgImage,
		siteName,
		configTitle,
		config.branding?.favicon,
		config.seo?.gscVerification,
		config.seo?.gaId,
		config.seo?.metaPixelId,
		config.seo?.pixelId,
		articleAuthor,
		articlePublishedTime,
		articleModifiedTime,
		articleSection,
		articleTags,
		twitterCard,
		keywords,
		schemaOrg,
		noIndex
	]);
	return null;
}
var _jsxFileName$1 = "/app/applet/src/components/ScrollProgress.tsx";
/**
* ScrollProgress displays a reactive, smooth progress bar at the top of the viewport
* (or container) as the user scrolls through long-form content, optimizing readability
* and reading orientation on mobile and desktop devices.
*/
function ScrollProgress({ className, targetRef, height = "h-1", color = "bg-blue" }) {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (targetRef?.current) {
			const el = targetRef.current;
			const handleScroll = () => {
				const scrollTop = el.scrollTop;
				const scrollHeight = el.scrollHeight - el.clientHeight;
				if (scrollHeight > 0) {
					const ratio = Math.min(1, Math.max(0, scrollTop / scrollHeight));
					setProgress(ratio * 100);
				} else setProgress(0);
			};
			el.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
			return () => el.removeEventListener("scroll", handleScroll);
		}
		const handleWindowScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			if (docHeight > 0) {
				const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
				setProgress(ratio * 100);
			} else setProgress(0);
		};
		window.addEventListener("scroll", handleWindowScroll, { passive: true });
		handleWindowScroll();
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, [targetRef]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pointer-events-none fixed top-0 left-0 right-0 z-[100] w-full bg-transparent", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("h-1 origin-left transition-[transform,width] duration-75 ease-out shadow-xs", height, color),
			style: { width: `${progress}%` }
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 75,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 68,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/SiteCanvas.tsx";
function CustomCodeContainer({ html, containerId }) {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		if (!html || !html.trim()) {
			container.innerHTML = "";
			return;
		}
		container.innerHTML = "";
		try {
			const doc = new DOMParser().parseFromString(html, "text/html");
			Array.from(doc.head.childNodes).concat(Array.from(doc.body.childNodes)).forEach((node) => {
				if (node.nodeName.toLowerCase() === "script") {
					const oldScript = node;
					const newScript = document.createElement("script");
					Array.from(oldScript.attributes).forEach((attr) => {
						newScript.setAttribute(attr.name, attr.value);
					});
					newScript.text = oldScript.text || oldScript.textContent || "";
					newScript.async = false;
					container.appendChild(newScript);
				} else container.appendChild(node.cloneNode(true));
			});
		} catch {
			container.innerHTML = html;
		}
		return () => {
			if (container) container.innerHTML = "";
		};
	}, [html]);
	if (!html) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		id: containerId,
		ref: containerRef,
		className: "custom-code-injection"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 58,
		columnNumber: 10
	}, this);
}
function SiteCanvas({ children, preview = false, className }) {
	const { config } = useSiteConfig();
	const theme = config.theme;
	const themeId = theme?.activeTheme || "codex-pro";
	const header = theme?.headerStyle || "floating";
	const hero = theme?.heroLayout || theme?.layout?.heroLayout || "streamer";
	const cards = theme?.cardStyle || theme?.layout?.cardStyle || "glass";
	const scale = theme?.fontSizeScale || theme?.layout?.fontSizeScale || "normal";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("site-canvas min-h-screen bg-background text-foreground", className),
		"data-site-theme": themeId,
		"data-header-style": header,
		"data-hero-layout": hero,
		"data-card-style": cards,
		"data-type-scale": scale,
		"data-preview": preview ? "true" : void 0,
		"data-theme": "light",
		style: buildThemeStyle(config),
		children: [
			theme?.customCss ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", {
				"data-theme-css": true,
				children: theme.customCss
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 27
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CustomCodeContainer, {
				html: config.codeInjection?.headerCode,
				containerId: "custom-head-code-injection"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 7
			}, this),
			children,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CustomCodeContainer, {
				html: config.codeInjection?.footerCode,
				containerId: "custom-footer-code-injection"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 79,
		columnNumber: 5
	}, this);
}
//#endregion
export { SEO as a, scrollToId as c, NewsletterSignup as i, usePreviewMode as l, Footer as n, ScrollProgress as o, Nav as r, SiteCanvas as s, Button as t };

import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, Y as require_jsx_runtime, _ as lazyRouteComponent, f as Scripts, g as Outlet, h as createRouter, p as HeadContent, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as SiteConfigProvider, f as WhatsAppLogo, l as TelegramLogo, m as useSiteConfig, p as cn, r as GmailLogo, s as PhoneLogo } from "./BrandMarks-BO6Hc-7M.mjs";
import { D as Send, Ft as CircleCheck, Z as LoaderCircle, n as X, u as TriangleAlert, y as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-nlN7YtWr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var ThemeContext = (0, import_react.createContext)({
	theme: "light",
	toggleTheme: () => {},
	setTheme: () => {},
	isDark: false
});
function ThemeProvider({ children }) {
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.classList.remove("dark");
		root.setAttribute("data-theme", "light");
		try {
			localStorage.setItem("codex-theme", "light");
		} catch {}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme: "light",
			toggleTheme: () => {},
			setTheme: () => {},
			isDark: false
		},
		children
	});
}
var CONTACT = {
	name: "Codex Dynamics",
	phoneE164: "+380636406783",
	phoneDigits: "380636406783",
	phoneDisplay: "+380 63 640 6783",
	email: "codexdynamix@gmail.com",
	addressStreet: "Sportyvna, 1A",
	addressCity: "Kyiv, 012023, Ukraine",
	addressFull: "Sportyvna, 1A, Kyiv, 012023, Ukraine",
	lat: 50.438743,
	lng: 30.523177
};
var LINKS = {
	tel: `tel:${CONTACT.phoneE164}`,
	whatsapp: `https://wa.me/${CONTACT.phoneDigits}`,
	telegram: `https://t.me/+${CONTACT.phoneDigits}`,
	viber: `viber://chat?number=%2B${CONTACT.phoneDigits}`,
	mailto: `mailto:${CONTACT.email}`,
	gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`,
	instagram: "https://www.instagram.com/codex_dynamics/",
	facebook: "https://www.facebook.com/profile.php?id=61571219783449",
	linkedin: "https://linkedin.com/company/codexdynamics",
	twitter: "https://x.com/codexdynamics",
	github: "https://github.com/codexdynamics",
	maps: `https://www.google.com/maps/search/?api=1&query=${CONTACT.lat},${CONTACT.lng}`,
	mapsApple: `https://maps.apple.com/?ll=${CONTACT.lat},${CONTACT.lng}&q=${encodeURIComponent(CONTACT.name)}`,
	mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${CONTACT.lat},${CONTACT.lng}`,
	mapsEmbed: `https://maps.google.com/maps?q=${CONTACT.lat},${CONTACT.lng}&hl=en&z=16&output=embed`
};
var SERVICES = [
	"High-Performance Website",
	"Web Design & UI/UX",
	"Full-Stack Web App",
	"SEO & Digital Marketing",
	"Performance Optimization",
	"General Inquiry"
];
function ContactModal({ isOpen, onClose, defaultService }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		service: defaultService || SERVICES[0],
		message: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	(0, import_react.useEffect)(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else {
			document.body.style.overflow = "";
			const timer = setTimeout(() => setIsSuccess(false), 300);
			return () => clearTimeout(timer);
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
	const validate = () => {
		const errs = {};
		if (!form.name.trim()) errs.name = "Please enter your name.";
		if (!form.email.trim()) errs.email = "Please enter your email.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email address.";
		if (!form.message.trim()) errs.message = "Please tell us a bit about your project or inquiry.";
		else if (form.message.trim().length < 8) errs.message = "Please provide at least 8 characters for your message.";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		try {
			setIsSubmitting(true);
			const payload = {
				name: form.name.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
				company: "",
				service: form.service,
				message: `[Service: ${form.service}]\n${form.message.trim()}`,
				source: "website_contact_modal"
			};
			await fetch("/api/submit-enquiry.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			}).catch(() => null);
			try {
				const raw = localStorage.getItem("codex-inquiries");
				const list = raw ? JSON.parse(raw) : [];
				list.push({
					...payload,
					at: (/* @__PURE__ */ new Date()).toISOString()
				});
				localStorage.setItem("codex-inquiries", JSON.stringify(list));
			} catch {}
			setIsSuccess(true);
			toast.success("Inquiry received! We'll reply shortly.");
		} catch {
			setIsSuccess(true);
			toast.success("Inquiry received!");
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .2 },
			onClick: onClose,
			className: "fixed inset-0 bg-black/60 backdrop-blur-md",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .96,
				y: 12
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .96,
				y: 12
			},
			transition: {
				duration: .25,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "contact-modal-title",
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-xl max-h-[90vh] bg-card rounded-3xl shadow-2xl border border-hairline overflow-hidden flex flex-col z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 sm:p-7 border-b border-hairline flex items-start justify-between gap-4 bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs font-semibold text-blue mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Direct Studio Desk" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "contact-modal-title",
						className: "text-xl sm:text-2xl font-bold text-label font-display tracking-tight",
						children: "Contact Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-muted-foreground mt-0.5",
						children: "Have a project in mind or need engineering counsel? We respond within 2 hours."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "size-9 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-label flex items-center justify-center transition-colors shrink-0",
					"aria-label": "Close dialog",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4.5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 sm:p-7 overflow-y-auto flex-1 space-y-6",
				children: [isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-8 text-center space-y-4 animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-14 rounded-full bg-blue/10 text-blue flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-label font-display",
								children: "Message Dispatched!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto",
								children: [
									"Thank you, ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-label",
										children: form.name
									}),
									". Our engineering directors have received your dispatch and will respond to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-label",
										children: form.email
									}),
									"."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex flex-col sm:flex-row items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								className: "w-full sm:w-auto px-6 h-10 rounded-xl bg-blue text-white text-xs font-semibold hover:bg-blue-hover transition-colors cursor-pointer",
								children: "Return to Studio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: LINKS.whatsapp,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-full sm:w-auto px-4 h-10 rounded-xl border border-hairline text-label text-xs font-semibold hover:bg-muted/40 transition-colors flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppLogo, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat on WhatsApp" })]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-label flex items-center justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your Name *" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.name,
										onChange: (e) => {
											setForm((f) => ({
												...f,
												name: e.target.value
											}));
											if (errors.name) setErrors((err) => ({
												...err,
												name: void 0
											}));
										},
										placeholder: "Alex Morgan",
										disabled: isSubmitting,
										className: cn("w-full h-10 rounded-xl bg-paper px-3.5 text-xs text-label border transition-colors outline-none", errors.name ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-hairline focus:border-blue focus:ring-1 focus:ring-blue")
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-destructive",
										children: errors.name
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-label flex items-center justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email Address *" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: form.email,
										onChange: (e) => {
											setForm((f) => ({
												...f,
												email: e.target.value
											}));
											if (errors.email) setErrors((err) => ({
												...err,
												email: void 0
											}));
										},
										placeholder: "alex@company.com",
										disabled: isSubmitting,
										className: cn("w-full h-10 rounded-xl bg-paper px-3.5 text-xs text-label border transition-colors outline-none", errors.email ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-hairline focus:border-blue focus:ring-1 focus:ring-blue")
									}),
									errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-destructive",
										children: errors.email
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-label flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone (optional)" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									value: form.phone,
									onChange: (e) => setForm((f) => ({
										...f,
										phone: e.target.value
									})),
									placeholder: "+380 63 000 0000",
									disabled: isSubmitting,
									className: "w-full h-10 rounded-xl bg-paper px-3.5 text-xs text-label border border-hairline focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-label",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project Focus" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.service,
									onChange: (e) => setForm((f) => ({
										...f,
										service: e.target.value
									})),
									disabled: isSubmitting,
									className: "w-full h-10 rounded-xl bg-paper px-3 text-xs text-label border border-hairline focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors",
									children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-medium text-label flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Message / Project Brief *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground",
										children: "Min. 8 characters"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 4,
									value: form.message,
									onChange: (e) => {
										setForm((f) => ({
											...f,
											message: e.target.value
										}));
										if (errors.message) setErrors((err) => ({
											...err,
											message: void 0
										}));
									},
									placeholder: "Outline your timeline, goals, or architectural requirements...",
									disabled: isSubmitting,
									className: cn("w-full rounded-xl bg-paper p-3 text-xs text-label border transition-colors outline-none resize-none leading-relaxed", errors.message ? "border-destructive focus:ring-1 focus:ring-destructive" : "border-hairline focus:border-blue focus:ring-1 focus:ring-blue")
								}),
								errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-destructive",
									children: errors.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full h-11 rounded-2xl bg-blue hover:bg-blue-hover text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer",
								children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transmitting Inquiry..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transmit Inquiry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })] })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-5 border-t border-hairline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-medium text-muted-foreground mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prefer an instant direct channel?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-subtle",
							children: "Kyiv Studio UTC+2"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: LINKS.whatsapp,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2 p-2 rounded-xl bg-muted/40 hover:bg-muted text-label text-xs transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppLogo, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "WhatsApp"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: LINKS.telegram,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2 p-2 rounded-xl bg-muted/40 hover:bg-muted text-label text-xs transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelegramLogo, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "Telegram"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: LINKS.tel,
								className: "flex items-center gap-2 p-2 rounded-xl bg-muted/40 hover:bg-muted text-label text-xs transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneLogo, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "Call"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: LINKS.gmail,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2 p-2 rounded-xl bg-muted/40 hover:bg-muted text-label text-xs transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailLogo, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "Gmail"
								})]
							})
						]
					})]
				})]
			})]
		})]
	}) });
}
var ContactModalContext = (0, import_react.createContext)(void 0);
function ContactModalProvider({ children }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [selectedService, setSelectedService] = (0, import_react.useState)(void 0);
	const openContactModal = (service) => {
		if (service) setSelectedService(service);
		setIsOpen(true);
	};
	const closeContactModal = () => {
		setIsOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactModalContext.Provider, {
		value: {
			isOpen,
			openContactModal,
			closeContactModal
		},
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactModal, {
			isOpen,
			onClose: closeContactModal,
			defaultService: selectedService
		})]
	});
}
function useContactModal() {
	const context = (0, import_react.useContext)(ContactModalContext);
	if (!context) throw new Error("useContactModal must be used within a ContactModalProvider");
	return context;
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function TidioWidget() {
	const { config } = useSiteConfig();
	const tidio = config.tidio;
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || typeof document === "undefined") return;
		if (window.location.pathname.startsWith("/admin") && tidio?.disableOnAdmin) {
			if (window.tidioChatApi?.hide) window.tidioChatApi.hide();
			return;
		}
		if (!tidio?.enabled || !tidio?.publicKey?.trim()) {
			const existingScript = document.getElementById("tidio-chat-script");
			if (existingScript) existingScript.remove();
			const tidioIframe = document.getElementById("tidio-chat-iframe");
			if (tidioIframe) tidioIframe.remove();
			const styleEl = document.getElementById("tidio-custom-styles");
			if (styleEl) styleEl.remove();
			window.dispatchEvent(new CustomEvent("tidio-chat-close"));
			return;
		}
		let key = tidio.publicKey.trim();
		if (key.includes("code.tidio.co/")) {
			const match = key.match(/code\.tidio\.co\/([a-zA-Z0-9_-]+)(?:\.js)?/);
			if (match) key = match[1];
		} else if (key.includes("<script")) {
			const match = key.match(/src=["'](?:https?:)?\/\/code\.tidio\.co\/([a-zA-Z0-9_-]+)(?:\.js)?["']/);
			if (match) key = match[1];
		}
		key = key.replace(/\.js$/, "");
		if (!key) return;
		const isLeft = tidio.position === "bottom-left";
		const hideMobile = Boolean(tidio.hideOnMobile);
		let styleEl = document.getElementById("tidio-custom-styles");
		if (!styleEl) {
			styleEl = document.createElement("style");
			styleEl.id = "tidio-custom-styles";
			document.head.appendChild(styleEl);
		}
		const updateStyles = (isOpen) => {
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
		const scriptId = "tidio-chat-script";
		let script = document.getElementById(scriptId);
		if (!script) {
			script = document.createElement("script");
			script.id = scriptId;
			script.src = `//code.tidio.co/${encodeURIComponent(key)}.js`;
			script.async = true;
			document.body.appendChild(script);
		} else if (!script.src.includes(key)) script.src = `//code.tidio.co/${encodeURIComponent(key)}.js`;
		if (window.tidioChatApi?.show) window.tidioChatApi.show();
		let lastOpen = false;
		const notifyState = (isOpen) => {
			if (isOpen !== lastOpen) {
				lastOpen = isOpen;
				updateStyles(isOpen);
				window.dispatchEvent(new CustomEvent("tidio-chat-status", { detail: { isOpen } }));
				if (isOpen) window.dispatchEvent(new CustomEvent("tidio-chat-open"));
				else window.dispatchEvent(new CustomEvent("tidio-chat-close"));
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
		const checkIframe = () => {
			bindApi();
			const iframe = document.getElementById("tidio-chat-iframe");
			if (iframe) {
				if ((iframe.offsetHeight || iframe.getBoundingClientRect().height) > 220) notifyState(true);
				else notifyState(false);
			}
		};
		const interval = setInterval(checkIframe, 800);
		return () => {
			clearInterval(interval);
		};
	}, [
		tidio?.enabled,
		tidio?.publicKey,
		tidio?.disableOnAdmin,
		tidio?.position,
		tidio?.hideOnMobile
	]);
	return null;
}
var styles_default = "/assets/styles-Dq5veWhi.css";
var APP_NAME = "Codex Dynamics";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "High-performance websites, web design, web development, custom CRMs, and digital marketing agency."
			},
			{
				name: "theme-color",
				content: "#ffffff"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
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
            ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactModalProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteConfigProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TidioWidget, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				offset: 56,
				toastOptions: { style: {
					background: "var(--color-paper)",
					border: "1px solid var(--color-hairline)",
					color: "var(--color-label)",
					borderRadius: "12px"
				} }
			})] })] }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$2 = () => import("./routes-BVjqZpK-.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-bUUxoSk-.mjs");
var Route$1 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./blog-BoLoNX0y.mjs");
var Route = createFileRoute("/blog")({
	validateSearch: (search) => {
		return { slug: search.slug || "" };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$3
	}),
	BlogRoute: Route.update({
		id: "/blog",
		path: "/blog",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { LINKS as i, useContactModal as n, CONTACT as r, router_exports as t };

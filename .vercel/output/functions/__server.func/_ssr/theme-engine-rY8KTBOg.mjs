//#region node_modules/.nitro/vite/services/ssr/assets/theme-engine-rY8KTBOg.js
/**
* Estimates reading time in minutes for a given text or markdown string.
* Uses the industry standard reading speed of 200–225 words per minute.
*/
function calculateReadingTime(content, wpm = 200) {
	if (!content || typeof content !== "string") return {
		minutes: 1,
		text: "1 min read",
		words: 0
	};
	const cleanText = content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*`_~>[\]()-]/g, " ").replace(/\s+/g, " ").trim();
	const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
	const minutes = Math.max(1, Math.ceil(words / wpm));
	return {
		minutes,
		text: `${minutes} min read`,
		words
	};
}
var DEFAULT_HOME_SEQUENCE = [
	"hero",
	"highlights",
	"services",
	"portfolio",
	"results",
	"about",
	"blog",
	"reviews",
	"contact"
];
var DEFAULT_ENABLED_COMPONENTS = [
	"header-builder",
	"hero-clip",
	"bento-highlights",
	"portfolio-showcase",
	"results-counter",
	"reviews-slider",
	"services-carousel",
	"gutenberg-blocks",
	"footer-widgets",
	"sticky-contact-dock"
];
var CAMEL_TO_KEBAB = {
	headerBuilder: "header-builder",
	gutenbergBlocks: "gutenberg-blocks",
	footerWidgets: "footer-widgets",
	stickyContactDock: "sticky-contact-dock",
	videoHero: "hero-clip",
	highlightsBento: "bento-highlights",
	portfolioShowcase: "portfolio-showcase",
	resultsCounter: "results-counter",
	reviewsSlider: "reviews-slider",
	tidioChat: "tidio-chat-widget",
	megaMenu: "header-builder",
	mobileDrawer: "header-builder"
};
function normalizeComponentIds(active) {
	if (!active) return [...DEFAULT_ENABLED_COMPONENTS];
	if (Array.isArray(active)) return active.filter((id) => typeof id === "string");
	if (typeof active === "object") {
		const ids = [];
		const seen = /* @__PURE__ */ new Set();
		for (const [key, value] of Object.entries(active)) {
			const id = CAMEL_TO_KEBAB[key] || key;
			seen.add(id);
			if (value) ids.push(id);
		}
		for (const id of DEFAULT_ENABLED_COMPONENTS) if (!seen.has(id)) ids.push(id);
		return ids.length ? ids : [...DEFAULT_ENABLED_COMPONENTS];
	}
	return [...DEFAULT_ENABLED_COMPONENTS];
}
function isComponentEnabled(config, id) {
	return normalizeComponentIds(config.theme?.activeComponents).includes(id);
}
function resolveFontPair(font) {
	switch (font) {
		case "playfair": return {
			display: "'Playfair Display', Georgia, serif",
			sans: "'Inter', system-ui, sans-serif"
		};
		case "syne": return {
			display: "'Syne', sans-serif",
			sans: "'Space Grotesk', system-ui, sans-serif"
		};
		case "inter": return {
			display: "'Plus Jakarta Sans', 'Inter', sans-serif",
			sans: "'Plus Jakarta Sans', 'Inter', sans-serif"
		};
		case "newsreader": return {
			display: "'Newsreader', Georgia, serif",
			sans: "'Inter', system-ui, sans-serif"
		};
		default: return {
			display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
			sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
		};
	}
}
function radiusTokens(br) {
	switch (br) {
		case "sharp": return {
			sm: "0px",
			md: "2px",
			lg: "4px",
			xl: "6px",
			xxl: "8px"
		};
		case "clean": return {
			sm: "4px",
			md: "8px",
			lg: "12px",
			xl: "16px",
			xxl: "20px"
		};
		case "pill": return {
			sm: "9999px",
			md: "9999px",
			lg: "24px",
			xl: "36px",
			xxl: "48px"
		};
		default: return {
			sm: "8px",
			md: "12px",
			lg: "18px",
			xl: "28px",
			xxl: "36px"
		};
	}
}
function typeScalePx(scale) {
	switch (scale) {
		case "compact": return 15;
		case "spacious": return 17;
		case "editorial":
		case "large": return 18;
		default: return 16;
	}
}
function resolveSectionsOrder(theme) {
	const order = theme?.layout?.sectionsOrder || theme?.sectionsOrder;
	if (order && order.length) return order;
	return [...DEFAULT_HOME_SEQUENCE];
}
function resolveSectionVisibility(theme) {
	const vis = theme?.layout?.sectionVisibility;
	if (vis) return vis;
	return Object.fromEntries(DEFAULT_HOME_SEQUENCE.map((id) => [id, true]));
}
function buildThemeStyle(config) {
	const c = config.colors || {};
	const t = config.theme;
	const fonts = resolveFontPair(t?.fontFamily);
	const radius = radiusTokens(t?.borderRadius);
	const scale = t?.fontSizeScale || t?.layout?.fontSizeScale;
	const leading = t?.lineHeight;
	const cw = t?.containerWidth || "1280px";
	const primaryFg = "#ffffff";
	const style = {
		"--color-primary": c.primary || "#0071e3",
		"--color-primary-foreground": primaryFg,
		"--color-blue": c.primary || "#0071e3",
		"--color-blue-hover": c.highlight || c.accent || c.primary || "#0077ed",
		"--color-brand": c.primary || "#0071e3",
		"--color-ring": c.ring || c.primary || "#0071e3",
		"--color-accent": c.accent || c.primary || "#0071e3",
		"--color-accent-foreground": primaryFg,
		"--color-background": c.background || "#f5f5f7",
		"--color-site-bg": c.background || "#f5f5f7",
		"--color-fill": c.background || "#f5f5f7",
		"--color-fill-elevated": c.secondary || c.background || "#fbfbfd",
		"--color-secondary": c.secondary || c.background || "#f5f5f7",
		"--color-card": c.cardBg || "#ffffff",
		"--color-site-card": c.cardBg || "#ffffff",
		"--color-paper": "#ffffff",
		"--color-surface": c.surface || c.cardBg || "#ffffff",
		"--color-foreground": c.textMain || "#1d1d1f",
		"--color-label": c.textMain || "#1d1d1f",
		"--color-card-foreground": c.textMain || "#1d1d1f",
		"--color-muted-foreground": c.textMuted || "#6e6e73",
		"--color-subtle": c.textMuted || "#6e6e73",
		"--color-border": c.border || "#d2d2d7",
		"--color-hairline": c.border || "rgba(0,0,0,0.08)",
		"--color-highlight": c.highlight || c.accent || c.primary || "#0071e3",
		"--color-inverse": c.inverse || "#1d1d1f",
		"--font-display": fonts.display,
		"--font-sans": fonts.sans,
		"--radius-sm": radius.sm,
		"--radius-md": radius.md,
		"--radius-lg": radius.lg,
		"--radius-xl": radius.xl,
		"--radius-2xl": radius.xxl,
		"--container-max": cw === "full" ? "100%" : cw,
		fontFamily: fonts.sans
	};
	if (scale && scale !== "normal" && scale !== "standard") style["font-size"] = `${typeScalePx(scale)}px`;
	if (typeof leading === "number" && leading > 0) {
		style["--body-leading"] = String(leading);
		style["line-height"] = String(leading);
	}
	return style;
}
function hrefToPreviewPage(href) {
	if (href.includes("work") || href.includes("portfolio") || href.includes("project")) return "work";
	if (href.includes("capabilities") || href.includes("services")) return "services";
	if (href.includes("studio") || href.includes("process") || href.includes("about")) return "studio";
	if (href.includes("insights") || href.includes("blog")) return "blog";
	if (href.includes("contact")) return "contact";
	return "home";
}
async function persistSiteConfig(config) {
	const res = await fetch("/api/crm/action", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			action: "save_site_content",
			payload: { config }
		})
	});
	if (!res.ok) throw new Error(`Could not save site config (${res.status})`);
	return res.json().catch(() => ({}));
}
//#endregion
export { isComponentEnabled as a, resolveSectionsOrder as c, hrefToPreviewPage as i, buildThemeStyle as n, persistSiteConfig as o, calculateReadingTime as r, resolveSectionVisibility as s, DEFAULT_HOME_SEQUENCE as t };

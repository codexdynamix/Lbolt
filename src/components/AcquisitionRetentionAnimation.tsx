import { useEffect, useState } from "react";
import { Mail, Megaphone, Search } from "lucide-react";

interface AcquisitionRetentionAnimationProps {
  poster?: string;
  className?: string;
  kicker?: string;
  timeline?: string;
}

type Mode = "meta" | "google" | "email";

export const AcquisitionRetentionAnimation: React.FC<AcquisitionRetentionAnimationProps> = ({
  poster = "/services/acquisition-retention.jpg",
  className = "",
  kicker = "05 / Acquisition & Retention",
  timeline = "Ongoing Growth Engine",
}) => {
  const [mode, setMode] = useState<Mode>("meta");
  const [emailStep, setEmailStep] = useState(0);
  const [roas, setRoas] = useState(5.8);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const order: Mode[] = ["meta", "google", "email"];
    const timer = setInterval(() => {
      setMode((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setEmailStep((n) => (n + 1) % 3), 2200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoas((n) => Number((5.4 + Math.random() * 0.9).toFixed(1)));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const drips = [
    { from: "Aura Goods", subject: "Your cart is waiting", preview: "We held your order for 2 hours." },
    { from: "Aura Goods", subject: "Why 240 brands switched", preview: "What changed in the first 30 days." },
    { from: "Codex Desk", subject: "A seat is open Thursday", preview: "15 minutes. Direct with the team." },
  ];

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#f5f5f7] ${className}`}>
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7]/45 to-white/25" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-[#6e6e73] uppercase backdrop-blur-xl">
            {kicker}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1d1d1f] shadow-[0_8px_24px_rgba(29,29,31,0.06)] backdrop-blur-xl">
            <span className="size-1.5 rounded-full bg-[#34c759]" />
            {roas}x ROAS
          </span>
        </div>

        <div className="mt-3 flex rounded-full bg-black/6 p-1 backdrop-blur-xl">
          {(
            [
              { id: "meta" as const, label: "Meta Ads", icon: Megaphone },
              { id: "google" as const, label: "Google Ads", icon: Search },
              { id: "email" as const, label: "Email Drips", icon: Mail },
            ]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-[11px] font-medium transition-all duration-200 ${
                mode === tab.id
                  ? "bg-white text-[#1d1d1f] shadow-[0_6px_18px_rgba(29,29,31,0.08)]"
                  : "text-[#6e6e73]"
              }`}
            >
              <tab.icon className="size-3" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === "meta" ? "Meta" : tab.id === "google" ? "Google" : "Mail"}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          {mode === "meta" && (
            <div className="w-full max-w-[240px]">
              <div className="rounded-[2rem] bg-[#1d1d1f] p-[3px] shadow-[0_28px_80px_rgba(29,29,31,0.22)]">
                <div className="overflow-hidden rounded-[1.8rem] bg-white">
                  <div className="flex items-center justify-between px-4 pt-3">
                    <span className="text-[10px] font-semibold tracking-wide text-[#1d1d1f]">Instagram</span>
                    <span className="text-[10px] text-[#8e8e93]">Sponsored</span>
                  </div>
                  <div className="mt-2 aspect-[4/5] bg-[#e8e8ed]">
                    <img src={poster} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <p className="text-[12px] font-semibold tracking-tight text-[#1d1d1f]">
                      Aura · Shop the drop
                    </p>
                    <p className="text-[11px] leading-snug text-[#6e6e73]">
                      High-intent Reels. Checkout in one tap.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#0071e3] px-3 py-1 text-[10px] font-semibold text-white">
                        Shop now
                      </span>
                      <span className="font-mono text-[10px] text-[#34c759]">CTR 4.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "google" && (
            <div className="w-full max-w-sm rounded-2xl border border-white/80 bg-white/82 p-4 shadow-[0_18px_50px_rgba(29,29,31,0.08)] backdrop-blur-2xl">
              <div className="flex items-center gap-2 rounded-full bg-[#f5f5f7] px-3 py-2">
                <Search className="size-3.5 text-[#6e6e73]" />
                <span className="text-[12px] text-[#1d1d1f]">luxury watch store</span>
              </div>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                  <p className="text-[10px] font-semibold tracking-wide text-[#188038] uppercase">Ad · krypton.com</p>
                  <p className="mt-0.5 text-[15px] font-semibold tracking-tight text-[#1a0dab]">
                    Krypton Horology — Precision Timepieces
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#4d5156]">
                    Shop the 2026 collection. Free insured shipping. Book a private viewing.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6e6e73]">
                  <span>Search · High intent</span>
                  <span className="font-mono font-semibold text-[#1d1d1f]">6.2x ROAS</span>
                </div>
              </div>
            </div>
          )}

          {mode === "email" && (
            <div className="w-full max-w-sm space-y-2">
              <p className="px-1 text-[10px] font-medium tracking-[0.18em] text-[#6e6e73] uppercase">
                Apple Mail · Drip sequence
              </p>
              {drips.map((item, i) => (
                <div
                  key={item.subject}
                  className={`rounded-2xl border bg-white/80 p-3 shadow-[0_10px_30px_rgba(29,29,31,0.06)] backdrop-blur-2xl transition-all duration-300 ${
                    emailStep === i
                      ? "border-white scale-[1.01]"
                      : "border-white/50 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#1d1d1f]">{item.from}</span>
                    <span className="font-mono text-[10px] text-[#8e8e93]">0{i + 1}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] tracking-tight text-[#1d1d1f]">{item.subject}</p>
                  <p className="text-[11px] text-[#6e6e73]">{item.preview}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#6e6e73]">
          <span>Meta · Google · Automated mail</span>
          <span className="font-mono">{timeline}</span>
        </div>
      </div>
    </div>
  );
};

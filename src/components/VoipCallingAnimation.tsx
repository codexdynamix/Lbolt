import { useEffect, useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Grid3x3,
  Pause,
  Play,
} from "lucide-react";

interface VoipCallingAnimationProps {
  poster?: string;
  className?: string;
  compact?: boolean;
  kicker?: string;
  timeline?: string;
}

type CallPhase = "ringing" | "connected" | "logged";

export const VoipCallingAnimation: React.FC<VoipCallingAnimationProps> = ({
  poster = "/services/crm-calling.jpg",
  className = "",
  compact: _compact = false,
  kicker = "04  /  Sales Automation",
  timeline = "Typical Delivery: 2 to 4 Weeks",
}) => {
  const [phase, setPhase] = useState<CallPhase>("ringing");
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout>;
    if (phase === "ringing") {
      timer = setTimeout(() => {
        setPhase("connected");
        setCallDuration(1);
      }, 3800);
    } else if (phase === "connected") {
      timer = setTimeout(() => setPhase("logged"), 11000);
    } else {
      timer = setTimeout(() => {
        setPhase("ringing");
        setCallDuration(0);
        setIsMuted(false);
        setIsOnHold(false);
      }, 3600);
    }
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "connected" || isOnHold) return;
    const interval = setInterval(() => setCallDuration((n) => n + 1), 1000);
    return () => clearInterval(interval);
  }, [phase, isOnHold]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#f5f5f7] ${className}`}>
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7]/35 to-white/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex w-full items-center justify-between">
          <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-[#6e6e73] uppercase backdrop-blur-xl">
            {kicker}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-[10px] text-[#6e6e73] backdrop-blur-xl">
            {timeline}
          </span>
        </div>

        <div className="flex w-full max-w-[280px] flex-1 items-center justify-center py-3">
          <div className="relative aspect-[9/19] h-full max-h-[420px] w-auto min-h-[280px]">
            <div className="absolute inset-0 rounded-[2.35rem] bg-[#1d1d1f] p-[3px] shadow-[0_28px_80px_rgba(29,29,31,0.28)]">
              <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-[#111]">
                <div className="absolute left-1/2 top-[9px] z-30 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />

                {phase === "ringing" && (
                  <div className="flex h-full flex-col items-center px-5 pb-8 pt-14 text-center text-white">
                    <div className="relative mb-5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                      <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#5ac8fa] to-[#007aff] text-2xl font-semibold">
                        MV
                      </div>
                    </div>
                    <p className="text-[11px] tracking-[0.22em] text-white/50 uppercase">Mobile</p>
                    <h4 className="mt-1 text-[22px] font-semibold tracking-tight">Marcus Vance</h4>
                    <p className="mt-1 text-[12px] text-white/55">Nordic Goods · Incoming</p>
                    <div className="mt-auto flex w-full items-center justify-between px-2">
                      <button
                        type="button"
                        onClick={() => setPhase("logged")}
                        className="flex flex-col items-center gap-2"
                      >
                        <span className="flex size-14 items-center justify-center rounded-full bg-[#ff3b30] text-white transition-transform duration-150 active:scale-[0.96]">
                          <PhoneOff className="size-6" />
                        </span>
                        <span className="text-[11px] text-white/70">Decline</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPhase("connected");
                          setCallDuration(1);
                        }}
                        className="flex flex-col items-center gap-2"
                      >
                        <span className="flex size-14 items-center justify-center rounded-full bg-[#34c759] text-white transition-transform duration-150 active:scale-[0.96]">
                          <Phone className="size-6" />
                        </span>
                        <span className="text-[11px] text-white/70">Answer</span>
                      </button>
                    </div>
                  </div>
                )}

                {phase === "connected" && (
                  <div className="flex h-full flex-col items-center px-5 pb-7 pt-14 text-center text-white">
                    <p className="text-[11px] tracking-[0.22em] text-white/45 uppercase">Codex Desk</p>
                    <h4 className="mt-1 text-[22px] font-semibold tracking-tight">Marcus Vance</h4>
                    <p className="mt-1 font-mono text-[13px] tabular-nums text-white/70">
                      {isOnHold ? "On Hold" : formatTimer(callDuration)}
                    </p>
                    <div className="mt-5 grid w-full grid-cols-3 gap-3">
                      <Control
                        active={isMuted}
                        onClick={() => setIsMuted((v) => !v)}
                        label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                      </Control>
                      <Control label="Audio">
                        <Volume2 className="size-5" />
                      </Control>
                      <Control
                        active={isOnHold}
                        onClick={() => setIsOnHold((v) => !v)}
                        label={isOnHold ? "Resume" : "Hold"}
                      >
                        {isOnHold ? <Play className="size-5" /> : <Pause className="size-5" />}
                      </Control>
                      <Control label="Keypad">
                        <Grid3x3 className="size-5" />
                      </Control>
                      <button
                        type="button"
                        onClick={() => setPhase("logged")}
                        className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-[#ff3b30] py-3 text-sm font-medium text-white transition-transform duration-150 active:scale-[0.96]"
                      >
                        <PhoneOff className="size-4" />
                        End
                      </button>
                    </div>
                    <p className="mt-auto text-[11px] text-white/40">Opus HD · Encrypted · Logged to CRM</p>
                  </div>
                )}

                {phase === "logged" && (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#34c759]">
                      <Phone className="size-7" />
                    </div>
                    <h4 className="text-lg font-semibold tracking-tight">Call logged</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                      02:44 recorded · Nordic Goods moved to Verbal Close
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-white/70 bg-white/72 p-3 shadow-[0_10px_40px_rgba(29,29,31,0.08)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium tracking-[0.18em] text-[#6e6e73] uppercase">Live CRM</p>
              <p className="mt-0.5 text-sm font-semibold tracking-tight text-[#1d1d1f]">Nordic Goods · $34,500</p>
            </div>
            <span className="rounded-full bg-[#34c759]/12 px-2.5 py-1 text-[10px] font-semibold text-[#248a3d]">
              {phase === "logged" ? "Synced" : "On desk"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function Control({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5"
    >
      <span
        className={`flex size-11 items-center justify-center rounded-full transition-colors duration-150 ${
          active ? "bg-white text-black" : "bg-white/12 text-white"
        }`}
      >
        {children}
      </span>
      <span className="text-[10px] text-white/55">{label}</span>
    </button>
  );
}

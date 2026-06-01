import {
  Banknote,
  Briefcase,
  AtSign,
  IdCard,
  FileText,
  Home,
  ShieldCheck,
} from "lucide-react";

const RADIUS = 165;
const CENTER = 220;

const sources = [
  { icon: IdCard, label: "Identity", angle: -90 },
  { icon: Banknote, label: "Bank statements", angle: -36 },
  { icon: Briefcase, label: "Employment", angle: 18 },
  { icon: AtSign, label: "Social footprint", angle: 72 },
  { icon: FileText, label: "Rental history", angle: 144 },
  { icon: Home, label: "Eviction records", angle: 216 },
];

function polarLayout(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = CENTER + Math.cos(rad) * RADIUS;
  const y = CENTER + Math.sin(rad) * RADIUS;
  const xPct = 50 + (Math.cos(rad) * RADIUS * 100) / 440;
  const yPct = 50 + (Math.sin(rad) * RADIUS * 100) / 440;
  const xStr = x.toFixed(2);
  const yStr = y.toFixed(2);
  return {
    x: xStr,
    y: yStr,
    left: `${xPct.toFixed(4)}%`,
    top: `${yPct.toFixed(4)}%`,
    motionPath: `M ${xStr} ${yStr} L ${CENTER} ${CENTER}`,
  };
}

const sourceLayout = sources.map((s) => ({
  ...s,
  ...polarLayout(s.angle),
}));

/**
 * SVG-based illustration showing every data source the AI agent validates,
 * all funneling into a central "shield" verification node.
 */
export function ScreeningSourcesIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <svg
        viewBox="0 0 440 440"
        className="h-auto w-full"
        aria-label="Sources of information validated by Squatter Away"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0.45"
            />
            <stop
              offset="60%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0"
            />
          </radialGradient>
          <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0.0"
            />
            <stop
              offset="50%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0.55"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.82 0.10 290)"
              stopOpacity="0.0"
            />
          </linearGradient>
        </defs>

        {/* Soft glow halo behind shield */}
        <circle cx={CENTER} cy={CENTER} r={130} fill="url(#centerGlow)" />

        {/* Orbit rings */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="oklch(0.89 0.012 70)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS - 38}
          fill="none"
          stroke="oklch(0.89 0.012 70)"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity="0.6"
        />

        {/* Connecting lines from each source to center */}
        {sourceLayout.map((s, i) => (
          <g key={s.label}>
            <line
              x1={CENTER}
              y1={CENTER}
              x2={s.x}
              y2={s.y}
              stroke="url(#strokeGrad)"
              strokeWidth="1.5"
            />
            {/* Animated traveling dot */}
            <circle r="2.5" fill="oklch(0.55 0.18 290)">
              <animateMotion
                dur={`${2.4 + i * 0.35}s`}
                repeatCount="indefinite"
                path={s.motionPath}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Source chips positioned absolutely over the SVG */}
      <div className="absolute inset-0">
        {sourceLayout.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: s.left, top: s.top }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-border bg-background shadow-sm sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 text-foreground" strokeWidth={1.75} />
              </div>
              <span className="whitespace-nowrap rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground backdrop-blur-sm sm:text-[11px]">
                {s.label}
              </span>
            </div>
          );
        })}

        {/* Center shield */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[20px] bg-foreground shadow-xl sm:h-24 sm:w-24">
            <ShieldCheck
              className="h-10 w-10 text-lavender sm:h-12 sm:w-12"
              strokeWidth={1.8}
            />
            <span className="absolute -bottom-2 right-1 rounded-full bg-lavender px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground">
              AI
            </span>
          </div>
          <span className="mt-3 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm">
            Decision-ready report
          </span>
        </div>
      </div>
    </div>
  );
}

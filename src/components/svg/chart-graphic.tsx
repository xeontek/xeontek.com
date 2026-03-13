export function ChartGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Funnel shape */}
      <path
        d="M60 40 L260 40 L200 115 L200 165 L120 165 L120 115 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
        fill="currentColor"
        fillOpacity="0.03"
      />

      {/* Funnel stage lines */}
      <line x1="85" y1="65" x2="235" y2="65" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      <line x1="107" y1="90" x2="213" y2="90" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />

      {/* Founders (top — entering funnel) */}
      {[90, 130, 160, 190, 230].map((x) => (
        <g key={`founder-${x}`}>
          <circle cx={x} cy={30} r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
          <line x1={x} y1={36} x2={x} y2={40} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        </g>
      ))}

      {/* Deal items inside funnel */}
      {[
        { x: 120, y: 52, w: 36, op: 0.15 },
        { x: 165, y: 52, w: 36, op: 0.12 },
        { x: 140, y: 74, w: 40, op: 0.18 },
        { x: 135, y: 96, w: 50, op: 0.2 },
      ].map(({ x, y, w, op }, i) => (
        <rect key={`deal-${i}`} x={x} y={y} width={w} height={8} rx="2" fill="currentColor" opacity={op} />
      ))}

      {/* Flow arrows inside funnel */}
      {[55, 80, 105].map((y) => (
        <path
          key={`arrow-${y}`}
          d={`M155 ${y} L160 ${y + 6} L165 ${y}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
          fill="none"
          strokeLinecap="round"
        />
      ))}

      {/* Output — matched deals */}
      <rect x="130" y="175" width="60" height="30" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M148 185 L155 193 L170 182" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Connection from funnel to output */}
      <line x1="160" y1="165" x2="160" y2="175" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />

      {/* Investor icons (bottom sides) */}
      {[
        { x: 70, y: 190 },
        { x: 250, y: 190 },
      ].map(({ x, y }) => (
        <g key={`investor-${x}`}>
          <circle cx={x} cy={y - 8} r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
          <path d={`M${x - 10} ${y + 4} Q${x} ${y - 4} ${x + 10} ${y + 4}`} stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          {/* Connection to matched deal */}
          <path
            d={`M${x + (x < 160 ? 12 : -12)} ${y} L${x < 160 ? 130 : 190} 190`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.15"
            strokeDasharray="4 3"
          />
        </g>
      ))}

      {/* Labels */}
      <text x="160" y="20" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Founders &amp; Deals
      </text>
      <text x="160" y="225" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Matched Capital
      </text>
      <text x="70" y="215" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Angels
      </text>
      <text x="250" y="215" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        VCs
      </text>
    </svg>
  );
}

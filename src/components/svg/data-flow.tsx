export function DataFlowGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* People icons (left side) */}
      {[60, 120, 180].map((y) => (
        <g key={`person-${y}`}>
          <circle cx="50" cy={y - 12} r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d={`M36 ${y + 8} Q50 ${y - 2} 64 ${y + 8}`} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        </g>
      ))}

      {/* Connection lines — people to central platform */}
      {[60, 120, 180].map((y) => (
        <path
          key={`link-left-${y}`}
          d={`M66 ${y} L130 120`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 3"
        />
      ))}

      {/* Central platform node */}
      <rect x="130" y="95" width="60" height="50" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <rect x="140" y="105" width="40" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="140" y="114" width="28" height="4" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="140" y="123" width="34" height="4" rx="2" fill="currentColor" opacity="0.12" />

      {/* Connection lines — platform to buildings */}
      {[55, 120, 185].map((y) => (
        <path
          key={`link-right-${y}`}
          d={`M190 120 L240 ${y}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 3"
        />
      ))}

      {/* Building icons (right side) */}
      {[
        { x: 252, y: 35, w: 24, h: 40 },
        { x: 248, y: 100, w: 32, h: 44 },
        { x: 252, y: 168, w: 24, h: 36 },
      ].map(({ x, y, w, h }, i) => (
        <g key={`building-${i}`}>
          <rect x={x} y={y} width={w} height={h} rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          {/* Windows */}
          {[0, 1, 2].map((row) => (
            <g key={`win-${i}-${row}`}>
              <rect x={x + 4} y={y + 5 + row * 10} width={4} height={4} rx="0.5" fill="currentColor" opacity="0.15" />
              <rect x={x + w - 8} y={y + 5 + row * 10} width={4} height={4} rx="0.5" fill="currentColor" opacity="0.15" />
            </g>
          ))}
        </g>
      ))}

      {/* Highlighted active connection */}
      <path
        d="M66 120 L130 120 M190 120 L240 120"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Labels */}
      <text x="50" y="218" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Investors &amp; Buyers
      </text>
      <text x="160" y="165" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Platform
      </text>
      <text x="264" y="218" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Providers
      </text>
    </svg>
  );
}

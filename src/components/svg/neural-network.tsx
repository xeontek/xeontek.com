export function NeuralNetworkGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Globe */}
      <circle cx="160" cy="115" r="70" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />

      {/* Latitude lines */}
      <ellipse cx="160" cy="85" rx="62" ry="12" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="160" cy="115" rx="70" ry="14" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="160" cy="145" rx="62" ry="12" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />

      {/* Longitude lines */}
      <ellipse cx="160" cy="115" rx="25" ry="70" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="160" cy="115" rx="50" ry="70" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />

      {/* Data pins — emerging market regions */}
      {[
        { x: 130, y: 80, r: 4, op: 0.5 },
        { x: 185, y: 90, r: 5, op: 0.6 },
        { x: 145, y: 120, r: 4, op: 0.45 },
        { x: 195, y: 115, r: 3, op: 0.4 },
        { x: 170, y: 140, r: 5, op: 0.55 },
        { x: 120, y: 105, r: 3, op: 0.35 },
        { x: 205, y: 135, r: 4, op: 0.5 },
      ].map(({ x, y, r, op }, i) => (
        <g key={`pin-${i}`}>
          <circle cx={x} cy={y} r={r} fill="currentColor" opacity={op} />
          <circle cx={x} cy={y} r={r + 4} stroke="currentColor" strokeWidth="0.8" opacity={op * 0.5} />
        </g>
      ))}

      {/* Connection lines between pins */}
      {[
        [130, 80, 185, 90],
        [185, 90, 195, 115],
        [145, 120, 170, 140],
        [130, 80, 145, 120],
        [195, 115, 205, 135],
        [170, 140, 205, 135],
        [120, 105, 145, 120],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={`conn-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.12"
          strokeDasharray="3 3"
        />
      ))}

      {/* Highlighted pulse ring on a key pin */}
      <circle cx="185" cy="90" r="12" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <circle cx="170" cy="140" r="12" stroke="currentColor" strokeWidth="1" opacity="0.15" />

      {/* Label */}
      <text x="160" y="210" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Emerging Markets
      </text>
    </svg>
  );
}

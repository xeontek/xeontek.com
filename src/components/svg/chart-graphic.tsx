export function ChartGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Axes */}
      <line x1="40" y1="200" x2="290" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="30" x2="40" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Grid lines */}
      {[60, 90, 120, 150, 170].map((y) => (
        <line key={y} x1="40" y1={y} x2="290" y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      ))}

      {/* Bar chart (background) */}
      {[
        { x: 60, h: 80 },
        { x: 95, h: 100 },
        { x: 130, h: 65 },
        { x: 165, h: 120 },
        { x: 200, h: 90 },
        { x: 235, h: 140 },
        { x: 270, h: 110 },
      ].map(({ x, h }) => (
        <rect
          key={x}
          x={x - 10}
          y={200 - h}
          width={20}
          height={h}
          rx="3"
          fill="currentColor"
          opacity="0.08"
        />
      ))}

      {/* Main trend line */}
      <path
        d="M60 160 L95 140 L130 155 L165 110 L200 120 L235 70 L270 85"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Trend area fill */}
      <path
        d="M60 160 L95 140 L130 155 L165 110 L200 120 L235 70 L270 85 L270 200 L60 200 Z"
        fill="currentColor"
        opacity="0.04"
      />

      {/* Data points */}
      {[
        [60, 160], [95, 140], [130, 155], [165, 110], [200, 120], [235, 70], [270, 85],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" opacity="0.3" />
      ))}

      {/* Secondary forecast line (dashed) */}
      <path
        d="M200 120 L235 95 L270 60"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
        strokeDasharray="5 4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Confidence band */}
      <path
        d="M200 130 L235 115 L270 90 L270 40 L235 75 L200 110 Z"
        fill="currentColor"
        opacity="0.04"
      />

      {/* Annotation */}
      <rect x="195" y="42" width="65" height="20" rx="4" fill="currentColor" opacity="0.08" />
      <text x="227" y="55" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="7" fontFamily="var(--font-body)">
        Projected
      </text>
    </svg>
  );
}

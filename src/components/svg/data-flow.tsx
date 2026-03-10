export function DataFlowGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Database cylinders */}
      <ellipse cx="60" cy="50" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M32 50 V80" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M88 50 V80" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="60" cy="80" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

      {/* Flow arrows */}
      <path d="M90 65 L130 100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />
      <path d="M90 65 L130 55" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />

      {/* Processing node */}
      <rect x="130" y="85" width="60" height="35" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M145 97 L150 107 L175 97" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

      {/* Analysis node */}
      <rect x="130" y="38" width="60" height="35" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="160" cy="55" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M155 55 L160 50 L165 58" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

      {/* Output arrows */}
      <path d="M190 55 L220 80" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />
      <path d="M190 102 L220 90" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />

      {/* Dashboard output */}
      <rect x="220" y="65" width="70" height="50" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Mini chart bars */}
      <rect x="232" y="95" width="8" height="12" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="244" y="88" width="8" height="19" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="256" y="82" width="8" height="25" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="268" y="78" width="8" height="29" rx="1" fill="currentColor" opacity="0.35" />
      {/* Chart line */}
      <path d="M236 90 L248 83 L260 86 L272 75" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />

      {/* Labels */}
      <text x="60" y="110" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Data Sources
      </text>
      <text x="160" y="140" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Processing
      </text>
      <text x="255" y="135" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">
        Insights
      </text>
    </svg>
  );
}

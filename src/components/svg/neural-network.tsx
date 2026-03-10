export function NeuralNetworkGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Input layer */}
      {[60, 100, 140, 180].map((y) => (
        <circle key={`i-${y}`} cx="60" cy={y} r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      ))}

      {/* Hidden layer 1 */}
      {[50, 90, 130, 170, 190].map((y) => (
        <circle key={`h1-${y}`} cx="140" cy={y} r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Hidden layer 2 */}
      {[70, 110, 150, 180].map((y) => (
        <circle key={`h2-${y}`} cx="210" cy={y} r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Output layer */}
      {[90, 130, 160].map((y) => (
        <circle key={`o-${y}`} cx="270" cy={y} r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      ))}

      {/* Connections - input to hidden 1 */}
      {[60, 100, 140, 180].map((iy) =>
        [50, 90, 130, 170, 190].map((hy) => (
          <line
            key={`c1-${iy}-${hy}`}
            x1="68" y1={iy} x2="133" y2={hy}
            stroke="currentColor" strokeWidth="0.5" opacity="0.12"
          />
        )),
      )}

      {/* Connections - hidden 1 to hidden 2 */}
      {[50, 90, 130, 170, 190].map((h1y) =>
        [70, 110, 150, 180].map((h2y) => (
          <line
            key={`c2-${h1y}-${h2y}`}
            x1="147" y1={h1y} x2="204" y2={h2y}
            stroke="currentColor" strokeWidth="0.5" opacity="0.12"
          />
        )),
      )}

      {/* Connections - hidden 2 to output */}
      {[70, 110, 150, 180].map((h2y) =>
        [90, 130, 160].map((oy) => (
          <line
            key={`c3-${h2y}-${oy}`}
            x1="216" y1={h2y} x2="262" y2={oy}
            stroke="currentColor" strokeWidth="0.5" opacity="0.12"
          />
        )),
      )}

      {/* Highlighted path */}
      <path
        d="M68 100 L133 90 L147 90 L204 110 L216 110 L262 130"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
        strokeLinecap="round"
        fill="none"
      />

      {/* Activated nodes on path */}
      <circle cx="60" cy="100" r="8" fill="currentColor" opacity="0.15" />
      <circle cx="140" cy="90" r="7" fill="currentColor" opacity="0.12" />
      <circle cx="210" cy="110" r="6" fill="currentColor" opacity="0.12" />
      <circle cx="270" cy="130" r="8" fill="currentColor" opacity="0.15" />

      {/* Labels */}
      <text x="60" y="210" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">Input</text>
      <text x="175" y="220" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">Hidden Layers</text>
      <text x="270" y="210" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="8" fontFamily="var(--font-body)">Output</text>
    </svg>
  );
}

export function HeroGrid({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dot grid */}
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 40 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 20 + 10}
            cy={row * 20 + 10}
            r={0.8}
            fill="currentColor"
            opacity={0.15}
          />
        )),
      )}
      {/* Accent connection lines */}
      <path
        d="M200 100 L350 180 L500 140 L650 200"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
        strokeLinecap="round"
      />
      <path
        d="M100 250 L250 200 L400 260 L550 220 L700 280"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        strokeLinecap="round"
      />
      {/* Data nodes */}
      <circle cx={200} cy={100} r={4} fill="currentColor" opacity={0.3} />
      <circle cx={350} cy={180} r={5} fill="currentColor" opacity={0.25} />
      <circle cx={500} cy={140} r={4} fill="currentColor" opacity={0.3} />
      <circle cx={650} cy={200} r={6} fill="currentColor" opacity={0.2} />
      <circle cx={250} cy={200} r={3} fill="currentColor" opacity={0.25} />
      <circle cx={400} cy={260} r={5} fill="currentColor" opacity={0.2} />
      <circle cx={550} cy={220} r={4} fill="currentColor" opacity={0.3} />
    </svg>
  );
}

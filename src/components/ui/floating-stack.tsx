"use client";

const rows = [
  {
    items: ["Python", "TypeScript", "SQL", "FastAPI", "Node.js", "PostgreSQL"],
    duration: "30s",
    direction: "normal",
  },
  {
    items: ["PyTorch", "scikit-learn", "pandas", "dbt", "Kafka", "Redis"],
    duration: "40s",
    direction: "reverse",
  },
  {
    items: ["Cloudflare", "SonarQube", "OAuth 2.0", "Docker", "Terraform"],
    duration: "25s",
    direction: "normal",
  },
];

function MarqueeRow({
  items,
  duration,
  direction,
}: {
  items: string[];
  duration: string;
  direction: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="group flex flex-row overflow-hidden py-2">
      <div
        className="flex w-max min-w-full shrink-0 flex-row flex-nowrap justify-around gap-5"
        style={{
          animation: `marquee-scroll ${duration} ${direction} linear infinite`,
        }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-teal-300 hover:text-teal-700 hover:shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FloatingStack() {
  return (
    <div className="relative">
      {rows.map((row, i) => (
        <MarqueeRow key={i} {...row} />
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-100" />
    </div>
  );
}

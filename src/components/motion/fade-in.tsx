import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({
  children,
  className,
  delay: _delay = 0,
  duration: _duration = 0.5,
  direction: _direction = "up",
  distance: _distance = 24,
}: FadeInProps) {
  return <div className={className}>{children}</div>;
}

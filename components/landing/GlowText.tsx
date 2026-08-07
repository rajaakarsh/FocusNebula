"use client";

interface GlowTextProps {
  text: string;
  className?: string;
}

export function GlowText({ text, className = "" }: GlowTextProps) {
  return (
    <span className={`glow-text ${className}`} data-text={text}>
      {text}
    </span>
  );
}

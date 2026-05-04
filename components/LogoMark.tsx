"use client";
import Group from "./imports/Group3/Group3";

interface LogoMarkProps {
  size?: number;
}

/**
 * AutoTube brand mark — the new gear/circuit logo from Figma.
 * Drop-in replacement for every place the old isometric cube was used.
 */
export function LogoMark({ size = 30 }: LogoMarkProps) {
  return (
    <div
      className="invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all duration-300"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <Group />
    </div>
  );
}

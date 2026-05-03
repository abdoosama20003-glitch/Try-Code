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

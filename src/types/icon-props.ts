import { HTMLAttributes } from "@builder.io/qwik";

/**
 * SVG element props
 * @property fill - Fill - "currentColor" (default) or an HTML color value
 */
export type IconPropsSvg = HTMLAttributes<SVGSVGElement> & {
  fill?: string;
}

/**
 * Icon props
 * @property size - Size (defaults to 32 if not supplied)
 * @property title - Optional title to include within SVG for accessibility purposes
 */
export type IconProps = IconPropsSvg & {
  size?: 12 | 16 | 20 | 24 | 32;
  title?: string;
}


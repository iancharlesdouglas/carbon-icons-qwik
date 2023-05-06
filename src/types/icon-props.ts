import { HTMLAttributes } from "@builder.io/qwik";

/**
 * SVG element props
 * @property fill - Fill - currentColor (default) or a color value
 */
export type IconPropsSvg = HTMLAttributes<HTMLElement> & {
  fill?: string;
}

/**
 * Icon props
 * @property size - Size (defaults to 32 if not supplied)
 * @property title - Optional title to include within the SVG for accessibility purposes
 */
export type IconProps = IconPropsSvg & {
  size?: 16 | 20 | 24 | 32;
  title?: string;
}


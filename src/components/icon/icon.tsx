import { component$ } from "@builder.io/qwik";
import { IconProps, IconPropsSvg } from "../../types/icon-props";

/**
 * Test icon for dev. purposes
 */
export const Icon = component$((props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px"
    width={(props.size ?? 32) + "px"} height={props.size ?? 32 + "px"} viewBox="0 0 32 32"  {...props as IconPropsSvg} fill={props.fill ?? 'currentColor'}>
      <path d="M16,4c6.6,0,12,5.4,12,12s-5.4,12-12,12S4,22.6,4,16S9.4,4,16,4 M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14 S23.7,2,16,2z"></path>
      <path d="M24 15L17 15 17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17z"></path>
      {props.title && <title>{props.title}</title>}
    </svg>);
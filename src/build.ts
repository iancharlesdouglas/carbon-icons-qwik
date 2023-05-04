import fs from 'fs-extra';
import {ModuleName, IconOutput, BuildIcons} from '@carbon/icons';
import {name, version as PKG_VERSION, devDependencies} from '../package.json';
import metadata from '@carbon/icons/metadata.json';

const VERSION = devDependencies['@carbon/icons'];

/*
 *  root-level icons
    - use name for the file 
    - use friendlyName for the type (transform into Pascal case e.g. "Add alt" -> "AddAlt")
    - use 32x32 version - assets[0] (where .size === 32)
    - SVG data from .optimized.data
    - add x, y, width, height, fill attributes to generated component
    Change names - convert leading numbers to names e.g. "3D" -> "ThreeD"
    Add title tag to SVG if there is a title
    Add size to component (16|20|24|32)
 */
export const build = async () => {
  const TIME_MARKER = 'Built in';
  console.info('Building icons....');
  console.time(TIME_MARKER);
  
  await fs.remove('src/icons');
  await fs.mkdir('src/icons');

  const iconDefs = (metadata as BuildIcons).icons;
  iconDefs.forEach(iconDef => {
    const fileName = `src/icons/${iconDef.name}.tsx`;
    const typeName = toPascalCase(iconDef.friendlyName);
    console.debug('Building', typeName);
    const defn32 = iconDef.assets.find(asset => asset.size === 32 || asset.size === 'glyph')!;
    const svgContent = defn32.optimized.data;
    const componentDef = `import { component$ } from "@builder.io/qwik";
import { IconProps } from "../types/icon-props";

export const ${typeName} = component$((props: IconProps) => 
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width={(props.size ?? 32) + "px"} height={props.size ?? 32 + "px"} viewBox="0 0 32 32" fill="currentColor">
    ${svgContent}
    {props.title && <title>{props.title}</title>}
  </svg>)`;
    fs.writeFile(fileName, componentDef);
  });

  console.timeEnd(TIME_MARKER);
  console.info('Icons built.');
};

/**
 * Converts a sentence-style name to a single word in Pascal case e.g. "Add alt" becomes "AddAlt"
 * @param name Input name (potentially sentence)
 * @returns Converted name
 */
export const toPascalCase = (name?: string): string | undefined => {
  if (!name) {
    return name;
  }
  const words = name?.split(' ');
  if (words?.length < 2) {
    return name;
  } else {
    return words
      .map(word => (word.substring(0, 1).toUpperCase() + word.substring(1)))
      .join('');
  }
};

const numbersToNames = new Map([['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five'], ['6', 'Six'], ['7', 'Seven'], ['8', 'Eight'], ['9', 'Nine']]);

export const stripLeadingNumbers(name?: string): string | undefined => {
  if (!name) {
    return name;
  }
  
};
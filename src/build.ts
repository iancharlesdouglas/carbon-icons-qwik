import fs from 'fs-extra';
import {BuildIcons} from '@carbon/icons';
import {name, version as PKG_VERSION, devDependencies} from '../package.json';
import metadata from '@carbon/icons/metadata.json';

const VERSION = devDependencies['@carbon/icons'];

/**
 * Builds the icons
 */
export const build = async () => {
  const TIME_MARKER = 'Built in';
  console.info('Building icons....');
  console.time(TIME_MARKER);
  
  await fs.remove('src/icons');
  await fs.mkdir('src/icons');

  const indexTsEntries: string[] = ['/* IBM Carbon Design System Icons */', 
    `/* Carbon icons version ${VERSION.replace(/[^~]/, '')} - built with ${name} version ${PKG_VERSION} */`,
  'export * from \'./types/icon-props\';'];
  const indexMdEntries: string[] = [];
  const indexDTsEntries: string[] = [
    'import { IconProps } from \'./src/types/icon-props\';',
    'import { Component } from \'@builder.io/qwik\';'];
  let iconsCount = 0;

  const iconDefs = (metadata as unknown as BuildIcons).icons;
  iconDefs.forEach(iconDef => {
    const fileName = `src/icons/${iconDef.name}.tsx`;
    const typeName = stripInvalidCharacters(toPascalCase(correctedFriendlyName(iconDef.name, iconDef.friendlyName)));
    const defn32 = iconDef.assets.find(asset => asset.size === 32 || asset.size === 'glyph')!;
    const svgContent = defn32.optimized.data;
    const componentDef = `import { component$ } from '@builder.io/qwik';
import { IconProps, IconPropsSvg } from '../types/icon-props';

export const ${typeName} = component$((props: IconProps) => 
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width={(props.size ?? 32) + "px"} height={props.size ?? 32 + "px"} viewBox="0 0 32 32" {...props as IconPropsSvg} fill={props.fill ?? 'currentColor'}>
    ${svgContent}
    {props.title && <title>{props.title}</title>}
  </svg>)
`;
    fs.writeFile(fileName, componentDef);

    const indexTsEntry = `export { ${typeName} } from './${fileName.substring(4, fileName.length - 4)}';`;
    indexTsEntries.push(indexTsEntry);
    const indexDTsEntry = `export function ${typeName}(props: IconProps): Component<IconProps>;`
    indexDTsEntries.push(indexDTsEntry);
    const indexMdEntry = `|${typeName}|${iconDef.friendlyName}|${iconDef.aliases.join(', ')}|${iconDef.category}|${iconDef.subcategory}`;
    indexMdEntries.push(indexMdEntry);
    iconsCount++;
  });

  await fs.remove('src/index.ts');
  fs.writeFile('src/index.ts', indexTsEntries.join('\n'));
  await fs.remove('index.d.ts');
  fs.writeFile('index.d.ts', indexDTsEntries.join('\n'));

  indexMdEntries.unshift('|-|-|-|-|-|');
  indexMdEntries.unshift('|Icon Component|Friendly Name|Aliases|Category|Sub-category|');
  indexMdEntries.unshift('');
  indexMdEntries.unshift(`> ${iconsCount} icons from ${name}@${VERSION}`);
  indexMdEntries.unshift('# Icon Index');
  fs.writeFile('ICON_INDEX.md', indexMdEntries.join('\n'));
  console.timeEnd(TIME_MARKER);
  console.info(`${iconsCount} icons built.`);
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

/**
 * Converts numbers to words and removes invalid characters
 * @param name Input name
 * @returns Sanitised name
 */
export const stripInvalidCharacters = (name?: string): string | undefined => {
  if (!name) {
    return name;
  }

  // Convert numbers to words
  let sanitisedName = name;
  const keys = Array.from(numbersToNames.keys());
  const initialChar = name.substring(0, 1);
  if (keys.find(key => initialChar === key)) {
    sanitisedName = numbersToNames.get(initialChar) + name.substring(1);
  }

  // Remove illegal chars
  const illegalChars = ['®', '™', '/', '-', '.'];
  while (illegalChars.find(char => sanitisedName.includes(char))) {
    illegalChars.forEach(char => (sanitisedName = sanitisedName.replace(char, '')));
  }

  return sanitisedName;
};

/**
 * Converts a duplicate friendly name to a unique name
 * @param name Name (key)
 * @param friendlyName Candidate friendly name
 * @returns Unique friendly name
 */
export const correctedFriendlyName = (name: string, friendlyName: string): string | undefined => {
  const correctedNames = new Map([['box--large', 'Box large'], ['watson--machine-learning', 'Watson Machine Learning']]);
  if (correctedNames.has(name)) {
    return correctedNames.get(name);
  } else {
    return friendlyName;
  }
}
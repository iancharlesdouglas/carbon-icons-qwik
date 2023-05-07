# carbon-icons-qwik

[![NPM][npm]][npm-url]
![GitHub](https://img.shields.io/github/license/iancharlesdouglas/carbon-icons-qwik?color=262626&style=for-the-badge)

> [Carbon Design System](https://github.com/carbon-design-system) SVG icons as Qwik components.  

This zero-dependency icon library provides the [Carbon Design System icons](https://www.carbondesignsystem.com/guidelines/icons/library) as Qwik components.

Inspired by [carbon-components-svelte](https://github.com/IBM/carbon-components-svelte) by Eric Liu.

## [Icon Index](ICON_INDEX.md)

## Installation
Install the icons in your Qwik project as a development dependency:
```sh
# pnpm
pnpm i -D carbon-icons-qwik

# npm
npm i -D carbon-icons-qwik

# Yarn
yarn add -D carbon-icons-qwik
```

## Usage
### Basic
In your Qwik component, import the desired icon - e.g. **Edit**:
```typescript
import { Edit } from 'carbon-icons-qwik';
```
Render it in your component's JSX:
```jsx
<div>
  <Edit />
</div>
```
### Custom size
Set the `size` property to `16`, `20`, `24` or `32` (default is `32`):
```jsx
<Edit size={24} />
```

 ### Title
 Set the `title` as an accessibility enhancement (this will be rendered in most browsers as a tooltip):
 ```jsx
 <Edit title="Edit document" />
 ```
### Fill color
The fill color can be set to any HTML color value using `fill` (default is `currentColor`):
```jsx
<Edit fill="red" />
```
Note that you can also set color using CSS - e.g. `svg { stroke: red }`.

### General attributes
You can apply any general HTML attribute to the icon component - e.g.:
```jsx
<Edit id="edit_icon" class="highlighted" />
```
Which will emit:
```html
<svg id="edit_icon" class="highlighted">
```

## Generating Icons
To generate the icons to build them, run the tests - e.g. `pnpm test`.  Icons will be output to the `src/icons` folder and the `index.ts` file will be regenerated.  Then run `pnpm build`.

## Licence
[Apache-2.0](LICENCE)

[npm]: https://img.shields.io/npm/v/carbon-icons-qwik.svg?color=262626&style=for-the-badge
[npm-url]: https://npmjs.com/package/carbon-icons-qwik

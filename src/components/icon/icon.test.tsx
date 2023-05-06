import {describe, expect, it} from 'vitest';
import { createDOM } from '@builder.io/qwik/testing';
import { Icon } from './icon';

describe('Icon component', () => {
  it('renders a fill of "currentColor" if no fill is stipulated, and width and height of 32 if no size is stipulated', async () => {
    const {screen, render} = await createDOM();

    await render(<Icon/>);

    const svgElement = screen.querySelector('svg') as SVGSVGElement;
    expect(svgElement.getAttribute('fill')).toEqual('currentColor');
    expect(svgElement.getAttribute('width')).toEqual('32px');
    expect(svgElement.getAttribute('height')).toEqual('32px');
  });

  it('renders a specific fill colour if one is stipulated', async () => {
    const {screen, render} = await createDOM();
    const expectedColor = 'red';

    await render(<Icon fill={expectedColor} />);

    const svgElement = screen.querySelector('svg') as SVGSVGElement;
    expect(svgElement.getAttribute('fill')).toEqual(expectedColor);

  });

  it('sizes the icon SVG element per the passed size attribute', async () => {
    const {screen, render} = await createDOM();
    const expectedSize = 16;

    await render(<Icon size={expectedSize} />);

    const svgElement = screen.querySelector('svg') as SVGSVGElement;
    expect(svgElement.getAttribute('fill')).toEqual('currentColor');
    expect(svgElement.getAttribute('width')).toEqual(`${expectedSize}px`);

  });

  it('renders a title if one is defined as an attribute', async () => {
    const {screen, render} = await createDOM();
    const expectedTitle = 'Title';

    await render(<Icon title={expectedTitle} />);
    
    const svgElement = screen.querySelector('svg > title') as SVGTitleElement;
    expect(svgElement.textContent).toEqual(expectedTitle);
  });

  it('renders supplied "id" attribute onto the SVG element', async () => {
    const {screen, render} = await createDOM();
    const customId = 'icon-id';

    await render(<Icon size={16} title="Title" fill="currentColor" id={customId} />);
    
    const svgElement = screen.querySelector('svg') as SVGSVGElement;
    console.log(svgElement.outerHTML);
    expect(svgElement.getAttribute('id')).toEqual(customId);
  });
});
import {describe, it, expect} from 'vitest';
import { stripLeadingNumbers, toPascalCase } from './build';

describe('Pascal casing', () => {
  it('Converts a sentence-like name into a single Pascal-cased word', () => {
    let expectedName: string | undefined = 'AddAlt';
    let inputName: string | undefined = 'Add alt';

    let actualName = toPascalCase(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = 'Add';
    inputName = 'Add';

    actualName = toPascalCase(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = undefined;
    inputName = undefined;

    actualName = toPascalCase(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = 'AddIconMain';
    inputName = 'Add icon main';

    actualName = toPascalCase(inputName);

    expect(actualName).toEqual(expectedName);
  });

  it('Changes leading numbers to words', () => {
    let expectedName: string | undefined = 'ThreeD';
    let inputName: string | undefined = '3D';

    let actualName = stripLeadingNumbers(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = 'FourKAlt';
    inputName = '4KAlt';

    actualName = stripLeadingNumbers(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = undefined;
    inputName = undefined;

    actualName = stripLeadingNumbers(inputName);

    expect(actualName).toEqual(expectedName);
  })
});
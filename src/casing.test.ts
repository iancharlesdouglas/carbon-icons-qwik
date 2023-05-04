import {describe, it, expect} from 'vitest';
import { toPascalCase } from './build';

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
});
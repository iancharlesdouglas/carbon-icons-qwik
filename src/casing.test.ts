import {describe, it, expect} from 'vitest';
import { correctedFriendlyName, stripInvalidCharacters, toPascalCase } from './build';

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

    let actualName = stripInvalidCharacters(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = 'FourKAlt';
    inputName = '4KAlt';

    actualName = stripInvalidCharacters(inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = undefined;
    inputName = undefined;

    actualName = stripInvalidCharacters(inputName);

    expect(actualName).toEqual(expectedName);
  });

  it('Removes illegal characters', () => {
    const expectedName: string | undefined = 'ACME01 Suite';
    const inputName: string | undefined = 'ACME/01® Suite®';

    const actualName = stripInvalidCharacters(inputName);

    expect(actualName).toEqual(expectedName);
  });

  it('Converts duplicated friendly names to unique names', () => {
    let expectedName : string | undefined = 'Box large';
    let inputKey: string = 'box--large';
    let inputName: string | undefined = 'IBM Box large';

    let actualName = correctedFriendlyName(inputKey, inputName);

    expect(actualName).toEqual(expectedName);

    expectedName = 'Watson Machine Learning';
    inputKey = 'watson--machine-learning';
    inputName = 'IBM Watson Machine Learning';

    actualName = correctedFriendlyName(inputKey, inputName);

    expect(actualName).toEqual(expectedName);
  });
});
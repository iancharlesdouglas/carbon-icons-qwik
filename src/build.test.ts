import {describe, it} from 'vitest';
import { build } from './build';

describe('Build', () => {
  it('Builds the icons', async () => {
    await build();
  });
});
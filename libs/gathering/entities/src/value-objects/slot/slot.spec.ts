import { describe, test, expect } from 'vitest';
import { Slot } from './slot';

describe('slot', () => {
  test('slot value-object', () => {
    const slot = new Slot();
    expect(slot).toBeDefined();
  })
})
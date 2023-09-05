import { describe, test, expect } from 'vitest';
import { Location } from './location';

describe('location', () => {
  test('location value-object', () => {
    const location = new Location();
    expect(location).toBeDefined();
  })
})
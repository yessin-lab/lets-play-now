import { describe, test, expect } from "vitest";
import { CreateSession } from './create-session';
import { Location, Slot } from '@lets-play-now/gathering-entities';

describe('a describe', () => {
  test('a test', () => {
    const createSession = new CreateSession();
    const location = new Location();
    const slot = new Slot();
    expect(createSession.handle({ slot, location })).toBe(true);
    expect(true).toBe(true);
  });
});
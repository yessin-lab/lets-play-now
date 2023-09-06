import { Location, Slot } from '@lets-play-now/gathering-entities'
import { describe, expect, test } from "vitest"
import { CreateSession } from './create-session'

describe('Create Session', () => {
  test('a test', () => {
    const location = new Location("Vincenneuh", "94300", "17 rue des patates");
    const start = new Date("2023-09-06T18:30:00")
    const end = new Date("2023-09-06T22:30:00")
    const slot = new Slot(start, end);

    const sessionRepository = new InMemorySessionRepository()
    const createSession = new CreateSession(InMemorySessionRepository);

    expect(createSession.handle({ slot, location })).toBe(true);


  });
});

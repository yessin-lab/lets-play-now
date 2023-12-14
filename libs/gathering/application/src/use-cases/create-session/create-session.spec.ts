import { Location, SessionId, Slot } from '@lets-play-now/gathering-entities';
import { CreateSession } from './create-session';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';

describe('Create Session', () => {
  it('should create session', () => {
    const id = new SessionId('9af34938-fd72-4bb5-838d-9931a5a7fcb7');
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const start = new Date('2023-09-06T18:30:00');
    const end = new Date('2023-09-06T22:30:00');
    const slot = new Slot(start, end);
    const session = { id, location, slot };

    const sessionRepository = new SessionInMemoryRepository();

    const createSession = new CreateSession(sessionRepository);

    createSession.handle(session);

    const savedSession = sessionRepository.getSavedSession();
    expect(savedSession).toEqual(session);
  });
});

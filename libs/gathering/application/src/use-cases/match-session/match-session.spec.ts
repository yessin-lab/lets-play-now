import {
  Location,
  Session,
  SessionId,
  Slot,
} from '@lets-play-now/gathering-entities';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';
import { MatchSession } from './match-session';

describe('Match Session', () => {
  it('should not find session when no session is stored', async () => {
    const start = new Date('2022-12-17T03:00:00');
    const end = new Date('2022-12-17T04:00:00');
    const availability = new Slot(start, end);

    const repository = new SessionInMemoryRepository();
    const matchSession = new MatchSession(repository);

    const sessions = await matchSession.handle(availability);
    expect(sessions).toEqual([]);
  });

  it('should return session when there is a matched session', async () => {
    const availability = new Slot(
      new Date('2022-12-17T18:00:00'),
      new Date('2022-12-17T23:00:00')
    );

    const repository = new SessionInMemoryRepository();
    const id = new SessionId('9af34938-fd72-4bb5-838d-9931a5a7fcb7');
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const slot = new Slot(
      new Date('2022-12-17T19:00:00'),
      new Date('2022-12-17T22:00:00')
    );
    const session = new Session(id, location, slot);
    repository.save(session);
    const matchSession = new MatchSession(repository);

    const sessions = await matchSession.handle(availability);
    expect(sessions).toEqual([session]);
  });
});

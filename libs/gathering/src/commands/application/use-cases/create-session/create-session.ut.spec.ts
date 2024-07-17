import {
  Game,
  Location,
  Player,
  SessionId,
  Slot,
  Table,
} from '../../../entities';
import { CreateSession } from './create-session';
import { SessionInMemoryRepository } from '../../repositories/session-in-memory-repository';

describe('Create Session', () => {
  it('should create session', () => {
    const id = new SessionId('9af34938-fd72-4bb5-838d-9931a5a7fcb7');
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const start = new Date('2023-09-06T18:30:00');
    const end = new Date('2023-09-06T22:30:00');
    const slot = new Slot(start, end);
    const games = [new Game('Seven Wonders')];
    const table = new Table(8, [
      new Player('player_1@mail.com'),
      new Player('player_2@mail.com'),
    ]);
    const session = { id, location, slot, games, table };

    const sessionRepository = new SessionInMemoryRepository();

    const createSession = new CreateSession(sessionRepository);

    createSession.handle(session);

    const savedSession = sessionRepository.getSavedSession();
    expect(savedSession).toEqual(session);
  });

  it("a session's games should not exceeds 10", () => {
    const id = new SessionId('9af34938-fd72-4bb5-838d-9931a5a7fcb7');
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const start = new Date('2023-09-06T18:30:00');
    const end = new Date('2023-09-06T22:30:00');
    const slot = new Slot(start, end);
    const games = [
      new Game('One Wonders'),
      new Game('Two Wonders'),
      new Game('Three Wonders'),
      new Game('Four Wonders'),
      new Game('Five Wonders'),
      new Game('Six Wonders'),
      new Game('Seven Wonders'),
      new Game('Eight Wonders'),
      new Game('Nine Wonders'),
      new Game('Ten Wonders'),
      new Game('Eleven Wonders'),
    ];
    const session = { id, location, slot, games };

    const sessionRepository = new SessionInMemoryRepository();

    const createSession = new CreateSession(sessionRepository);

    expect(() => createSession.handle(session)).rejects.toThrow();
  });
});

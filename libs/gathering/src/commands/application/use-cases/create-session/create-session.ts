import { Game, Location, SessionId, Slot } from '../../../entities';
import { SessionRepository } from '../../repositories/session-repository';
import { Session } from '../../../entities';
import { ICreateSession } from './create-session.interface';

export class CreateSession implements ICreateSession {
  private readonly sessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async handle({
    id,
    location,
    slot,
    games,
  }: {
    id: SessionId;
    location: Location;
    slot: Slot;
    games: Game[];
  }): Promise<void> {
    const session = new Session(id, location, slot, games);
    this.sessionRepository.save(session);
  }
}

import {
  Game,
  Location,
  Player,
  SessionId,
  Slot,
  Table,
} from '../../../entities';
import { SessionRepository } from '../../repositories/session-repository';
import { Session } from '../../../entities';
import { ICreateSession } from './create-session.interface';

export class CreateSession implements ICreateSession {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async handle({
    id,
    location,
    slot,
    games,
    table,
  }: {
    id: SessionId;
    location: Location;
    slot: Slot;
    games: Game[];
    table: Table;
  }): Promise<void> {
    const session = new Session(id, location, slot, games, table);
    await this.sessionRepository.save(session);
  }
}

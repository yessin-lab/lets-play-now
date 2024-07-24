import { Game, Location, SessionId, Slot, Table } from '../../../entities';
import { SessionRepository } from '../../repositories/session-repository';
import { Session } from '../../../entities';
import { ICreateSession } from './create-session.interface';

export class CreateSession implements ICreateSession {
  constructor(private readonly sessionRepository: SessionRepository) {}

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

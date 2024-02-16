import { Session, Slot } from '../../entities';
import { SessionRepository } from './session-repository';

export class SessionInMemoryRepository implements SessionRepository {
  private sessions: Session[] = [];

  async save(session: Session): Promise<void> {
    this.sessions.push(session);
    return;
  }

  getSavedSession() {
    return this.sessions[this.sessions.length - 1];
  }

  async findMatchingSessions(slot: Slot): Promise<Session[]> {
    return this.sessions;
  }
}

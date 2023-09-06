import { SessionRepository } from './session-repository'
import { Session } from '@lets-play-now/gathering-entities';

export class SessionInMemoryRepository implements SessionRepository {
  private session!: Session;

  async save(session: Session): Promise<void> {
    this.session = session;
    return;
  }

  getSavedSession() {
    return this.session;
  }
};
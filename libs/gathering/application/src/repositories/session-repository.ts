import { Location, Session, Slot } from '@lets-play-now/gathering-entities';

export interface SessionRepository {
  save(session: Session): Promise<void>;
  findMatchingSessions(slot: Slot, location: Location): Promise<Session[]>;
}

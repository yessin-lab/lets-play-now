import { Location, Session, Slot } from '../../entities';

export abstract class SessionRepository {
  abstract save(session: Session): Promise<void>;
  abstract findMatchingSessions(
    slot: Slot,
    location: Location
  ): Promise<Session[]>;
}

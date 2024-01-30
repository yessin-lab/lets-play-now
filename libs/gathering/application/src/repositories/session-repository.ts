import { Location, Session, Slot } from '@lets-play-now/gathering-entities'

export abstract class SessionRepository {
  abstract save(session: Session): Promise<void>;
  abstract findMatchingSessions(
    slot: Slot,
    location: Location
  ): Promise<Session[]>;
}

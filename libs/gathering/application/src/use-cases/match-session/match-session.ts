import { Location, Slot } from '@lets-play-now/gathering-entities'
import { SessionRepository } from '../../repositories/session-repository'

export class GetMatchingSession {
  constructor(private readonly sessionRepository: SessionRepository) {}

  handle(availability: Slot, location: Location) {
    return this.sessionRepository.findMatchingSessions(availability, location);
  }
}

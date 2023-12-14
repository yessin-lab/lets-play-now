import { Slot } from '@lets-play-now/gathering-entities';
import { SessionRepository } from '../../repositories/session-repository';

export class MatchSession {
  constructor(private readonly sessionRepository: SessionRepository) {}

  handle(availability: Slot) {
    return this.sessionRepository.findMatchingSessions(availability);
  }
}

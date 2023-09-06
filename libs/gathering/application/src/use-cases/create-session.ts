import { Location, Slot } from '@lets-play-now/gathering-entities';
import { SessionRepository } from '../repositories/session-repository';
import { Session } from '@lets-play-now/gathering-entities';

export class CreateSession {
  private readonly sessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  };

  handle({ location, slot }: { location: Location, slot: Slot }): boolean {
    this.sessionRepository.save(new Session(location, slot));
    return true;
  };
}
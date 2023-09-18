import { Location, Slot } from '@lets-play-now/gathering-entities';
import { SessionRepository } from '../repositories/session-repository';
import { Session } from '@lets-play-now/gathering-entities';
import { ICreateSession } from './create-session.interface';

export class CreateSession implements ICreateSession {
  private readonly sessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async handle({
    location,
    slot,
  }: {
    location: Location;
    slot: Slot;
  }): Promise<void> {
    this.sessionRepository.save(new Session(location, slot));
  }
}

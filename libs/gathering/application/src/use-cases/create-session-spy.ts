import { Location, Slot } from '@lets-play-now/gathering-entities';
import { ICreateSession } from './create-session.interface';

export class CreateSessionSpy implements ICreateSession {
  private location?: Location;
  private slot?: Slot;

  async handle({
    location,
    slot,
  }: {
    location: Location;
    slot: Slot;
  }): Promise<void> {
    this.location = location;
    this.slot = slot;
  }

  hasBeenCalledWith({
    location,
    slot,
  }: {
    location: Location;
    slot: Slot;
  }): boolean {
    return (
      this.location?.equals(location) === true &&
      this.slot?.equals(slot) === true
    );
  }
}

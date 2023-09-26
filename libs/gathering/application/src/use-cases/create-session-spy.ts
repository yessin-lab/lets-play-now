import { Location, SessionId, Slot } from '@lets-play-now/gathering-entities';
import { ICreateSession } from './create-session.interface';

export class CreateSessionSpy implements ICreateSession {
  private id?: SessionId;
  private location?: Location;
  private slot?: Slot;

  async handle({
    id,
    location,
    slot,
  }: {
    id: SessionId;
    location: Location;
    slot: Slot;
  }): Promise<void> {
    this.id = id;
    this.location = location;
    this.slot = slot;
  }

  hasBeenCalledWith({
    id,
    location,
    slot,
  }: {
    id: SessionId;
    location: Location;
    slot: Slot;
  }): boolean {
    return (
      this.id?.equals(id) === true &&
      this.location?.equals(location) === true &&
      this.slot?.equals(slot) === true
    );
  }
}

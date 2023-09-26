import { Location, SessionId, Slot } from '@lets-play-now/gathering-entities';

export abstract class ICreateSession {
  abstract handle({
    id,
    location,
    slot,
  }: {
    id: SessionId;
    location: Location;
    slot: Slot;
  }): Promise<void>;
}

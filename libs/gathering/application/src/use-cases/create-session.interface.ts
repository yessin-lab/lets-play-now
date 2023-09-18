import { Location, Slot } from '@lets-play-now/gathering-entities';

export abstract class ICreateSession {
  abstract handle({
    location,
    slot,
  }: {
    location: Location;
    slot: Slot;
  }): Promise<void>;
}

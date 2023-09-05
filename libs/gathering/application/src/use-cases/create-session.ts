import { Location, Slot } from '@lets-play-now/gathering-entities';

export class CreateSession {
  handle({ location, slot }: { location: Location, slot: Slot }): boolean {
    return true;
  };
}
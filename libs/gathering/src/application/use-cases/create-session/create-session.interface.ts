import { Location, SessionId, Slot } from '../../../entities';

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

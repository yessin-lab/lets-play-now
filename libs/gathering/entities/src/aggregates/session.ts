import { Slot } from '../value-objects/slot/slot';
import { Location } from '../value-objects/location/location';
import { SessionId } from '../value-objects/session-id/session-id';

export class Session {
  constructor(
    private readonly id: SessionId,
    private readonly location: Location,
    private readonly slot: Slot
  ) {}
}

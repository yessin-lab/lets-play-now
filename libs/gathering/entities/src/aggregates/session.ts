import { Location } from '../value-objects/location/location'
import { SessionId } from '../value-objects/session-id/session-id'
import { Slot } from '../value-objects/slot/slot'

export class Session {
  constructor(
    public readonly id: SessionId,
    public readonly location: Location,
    public readonly slot: Slot
  ) {}
}

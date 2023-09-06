import { Slot } from "../value-objects/slot/slot";
import { Location } from "../value-objects/location/location";

export class Session {
  private location: Location;
  private slot: Slot;

  constructor(location: Location, slot: Slot) {
    this.location = location;
    this.slot = slot;
  }
}
import { Game } from '../value-objects/game/game';
import { Location } from '../value-objects/location/location';
import { SessionId } from '../value-objects/session-id/session-id';
import { Slot } from '../value-objects/slot/slot';
import { Table } from '../value-objects/table/table';

export class Session {
  constructor(
    public readonly id: SessionId,
    public readonly location: Location,
    public readonly slot: Slot,
    public readonly games: Game[],
    public readonly table: Table
  ) {
    if (games.length > 10) {
      throw new Error();
    }
  }
}

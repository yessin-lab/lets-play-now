import { Player } from '../player/player';

export class Table {
  constructor(
    private readonly maxPlayers: number,
    private readonly players: Player[]
  ) {}
}

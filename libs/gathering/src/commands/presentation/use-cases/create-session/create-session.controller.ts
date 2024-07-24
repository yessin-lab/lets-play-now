import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateSession } from '../../../application';
import {
  SessionId,
  Slot,
  Location,
  Game,
  Table,
  Player,
} from '../../../entities';

class CreateSessionDto {
  location!: { city: string; postalCode: string; address: string };
  slot!: { start: string; end: string };
  id!: string;
  games!: string[];
  table!: { players: string[]; maxPlayers: number };
}

@Controller('create-session')
export class CreateSessionController {
  constructor(private readonly createSession: CreateSession) {}

  @Post()
  async postCreateSession(@Body() dto: CreateSessionDto): Promise<void> {
    try {
      const location = new Location(
        dto.location.city,
        dto.location.postalCode,
        dto.location.address
      );
      const slot = new Slot(new Date(dto.slot.start), new Date(dto.slot.end));
      const id = new SessionId(dto.id);
      const games = dto.games.map((game) => new Game(game));
      const table = new Table(
        dto.table.maxPlayers,
        dto.table.players.map((player) => new Player(player))
      );

      return await this.createSession.handle({
        id,
        location,
        slot,
        games,
        table,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

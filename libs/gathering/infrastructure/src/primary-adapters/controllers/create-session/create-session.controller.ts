import { Body, Controller, Post } from '@nestjs/common';
import { ICreateSession } from '@lets-play-now/application';
import { Location, Slot } from '@lets-play-now/gathering-entities';

class CreateSessionDto {
  location!: { city: string; postalCode: string; address: string };
  slot!: { start: string; end: string };
}

@Controller('create-session')
export class CreateSessionController {
  constructor(private readonly createSession: ICreateSession) {}

  @Post()
  postCreateSession(@Body() dto: CreateSessionDto): Promise<void> {
    const location = new Location(
      dto.location.city,
      dto.location.postalCode,
      dto.location.address
    );
    const slot = new Slot(new Date(dto.slot.start), new Date(dto.slot.end));

    return this.createSession.handle({ location, slot });
  }
}

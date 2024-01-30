import { Query, Controller, Get } from '@nestjs/common';
import { GetMatchingSession } from '@lets-play-now/application';
import { Location, Slot } from '@lets-play-now/gathering-entities';

class GetMatchingSessionDto {
  city!: string;
  postalCode!: string;
  address!: string
  start!: string;
  end!: string;
};


@Controller('matching-session')
export class GetMatchingSessionController {
  constructor(private readonly getMatchingSession: GetMatchingSession) {}

  @Get()
  handle(@Query() dto: GetMatchingSessionDto) {
    const location = new Location(
      dto.city,
      dto.postalCode,
      dto.address
    );
    const slot = new Slot(new Date(dto.start), new Date(dto.end));

    return this.getMatchingSession.handle(slot, location);
  }
}

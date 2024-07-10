import { Query, Controller, Get } from '@nestjs/common';
import { GetMatchingSession } from './get-matching-session';

class GetMatchingSessionDto {
  city!: string;
  start!: string;
  end!: string;
}

@Controller('matching-session')
export class GetMatchingSessionController {
  constructor(private readonly getMatchingSession: GetMatchingSession) {}

  @Get()
  handle(@Query() { start, end, city }: GetMatchingSessionDto) {
    return this.getMatchingSession.handle(new Date(start), new Date(end), city);
  }
}

import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ICreateSession } from '../../../../application';
import { Location, SessionId, Slot } from 'libs/gathering/src/entities';

class CreateSessionDto {
  location!: { city: string; postalCode: string; address: string };
  slot!: { start: string; end: string };
  id!: string;
}

@Controller('create-session')
export class CreateSessionController {
  constructor(private readonly createSession: ICreateSession) {}

  @Post()
  postCreateSession(@Body() dto: CreateSessionDto): Promise<void> {
    try {
      const location = new Location(
        dto.location.city,
        dto.location.postalCode,
        dto.location.address
      );
      const slot = new Slot(new Date(dto.slot.start), new Date(dto.slot.end));
      const id = new SessionId(dto.id);

      return this.createSession.handle({ id, location, slot });
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}

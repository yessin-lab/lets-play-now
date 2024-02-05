import { Module } from '@nestjs/common';
import { CreateSessionController } from './create-session.controller';
import { CreateSession, ICreateSession } from '@lets-play-now/application';

@Module({
  controllers: [CreateSessionController],
  providers: [{ provide: ICreateSession, useClass: CreateSession }],
})
export class CreateSessionModule {}

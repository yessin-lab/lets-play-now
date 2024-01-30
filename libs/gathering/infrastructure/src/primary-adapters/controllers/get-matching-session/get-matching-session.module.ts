import { Module } from '@nestjs/common';
import { GetMatchingSession } from '@lets-play-now/application';
import { GetMatchingSessionController } from './get-matching-session.controller';

@Module({
  controllers: [GetMatchingSessionController],
  providers: [GetMatchingSession],
})
export class GetMatchingSessionModule {}

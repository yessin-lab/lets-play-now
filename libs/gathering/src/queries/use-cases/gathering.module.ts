import { Module } from '@nestjs/common';
import { GetMatchingSessionModule } from './get-matching-session/get-matching-session.module';

@Module({
  imports: [GetMatchingSessionModule],
})
export class GatheringQueriesModule {}

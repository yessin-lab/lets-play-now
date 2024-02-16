import {
  GatheringCommandsModule,
  GatheringQueriesModule,
} from '@lets-play-now/gathering';
import { Module } from '@nestjs/common';

@Module({
  imports: [GatheringCommandsModule, GatheringQueriesModule],
})
export class AppModule {}

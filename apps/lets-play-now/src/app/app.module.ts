import { Module } from '@nestjs/common';

// TODO remove that eslint disable
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  CreateSessionModule,
  GetMatchingSessionModule,
} from '@lets-play-now/gathering-infrastructure';

@Module({
  imports: [CreateSessionModule, GetMatchingSessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

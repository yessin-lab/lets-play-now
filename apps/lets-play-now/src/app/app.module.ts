import { Module } from '@nestjs/common';

// TODO remove that eslint disable
// eslint-disable-next-line @nx/enforce-module-boundaries
import { GatheringModule } from '@lets-play-now/gathering-infrastructure';

@Module({
  imports: [GatheringModule],
})
export class AppModule {}

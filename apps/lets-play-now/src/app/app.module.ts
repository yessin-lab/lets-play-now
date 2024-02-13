import { Module } from '@nestjs/common';

import { GatheringModule } from '@lets-play-now/gathering';

@Module({
  imports: [GatheringModule],
})
export class AppModule {}

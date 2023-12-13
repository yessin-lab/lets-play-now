import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// TODO remove that eslint disable
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateSessionModule } from '@lets-play-now/gathering-infrastructure';

@Module({
  imports: [CreateSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

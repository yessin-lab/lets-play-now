import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './gathering-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      load: [config],
    }),
  ],
  exports: [ConfigModule],
})
export class GatheringConfigModule {}

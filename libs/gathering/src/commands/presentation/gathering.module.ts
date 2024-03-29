import { Module } from '@nestjs/common';
import { CreateSessionModule } from './use-cases/create-session/create-session.module';
import { GetMatchingSessionModule } from '../../queries/use-cases/get-matching-session/get-matching-session.module';

@Module({
  imports: [CreateSessionModule, GetMatchingSessionModule],
})
export class GatheringCommandsModule {}

import { GetMatchingSession } from '../../commands/application';
import { Module } from '@nestjs/common';
import { GetMatchingSessionController } from './get-matching-session.controller';
import { SessionKnexRepository } from '../../commands/infrastructure';
import {
  KnexModule,
  KnexProvider,
} from '../../commands/presentation/setup/database/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [GetMatchingSessionController],
  providers: [
    {
      provide: GetMatchingSession,
      inject: [KnexProvider],
      useFactory: ({ knex }: KnexProvider) => {
        const repo = new SessionKnexRepository(knex);
        return new GetMatchingSession(repo);
      },
    },
  ],
})
export class GetMatchingSessionModule {}

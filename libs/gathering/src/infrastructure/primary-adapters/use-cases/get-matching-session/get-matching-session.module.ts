import { GetMatchingSession } from '../../../../application';
import { Module } from '@nestjs/common';
import { GetMatchingSessionController } from './get-matching-session.controller';
import { SessionKnexRepository } from '../../../secondary-adapters/repositories/session-repository/session-knex-repository';
import { KnexModule, KnexProvider } from '../../setup/database/knex.module';

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

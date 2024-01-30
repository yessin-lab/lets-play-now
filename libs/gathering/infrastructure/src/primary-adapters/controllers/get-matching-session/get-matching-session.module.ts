import { GetMatchingSession } from '@lets-play-now/application'
import { Module } from '@nestjs/common'
import knex from 'knex'
import { SessionKnexRepository } from '../../../secondary-adapters/repositories/session-repository/session-knex-repository'
import { GetMatchingSessionController } from './get-matching-session.controller'

@Module({
  controllers: [GetMatchingSessionController],
  providers: [
    {
      provide: GetMatchingSession,
      useFactory: () => {

        const sessionKnexRepository = new SessionKnexRepository(
          knex({
            client: 'postgresql',
            connection: {
              connectionString:
                'postgres://admin:admin@localhost:5432/letsplaynow',
            },
            pool: {
              min: 2,
              max: 10,
            },
            migrations: {
              tableName: 'knex_migrations',
            },
          })
        );
        return new GetMatchingSession(sessionKnexRepository);
      },
    },
  ],
})
export class GetMatchingSessionModule {}

import { GetMatchingSession } from '@lets-play-now/application';
import { Injectable, Module } from '@nestjs/common';
import { GetMatchingSessionController } from './get-matching-session.controller';
import { SessionKnexRepository } from '../../../secondary-adapters/repositories/session-repository/session-knex-repository';
import knex, { Knex } from 'knex';

// TODO Move Knex
@Injectable()
export class KnexProvider {
  constructor(public readonly knex: Knex) {}
}

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: KnexProvider,
      useValue: new KnexProvider(
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
      ),
    },
  ],
  exports: [KnexProvider],
})
export class KnexModule {}

@Module({
  imports: [KnexModule],
  controllers: [GetMatchingSessionController],
  providers: [
    {
      inject: [KnexProvider],
      provide: GetMatchingSession,
      useFactory: (knexProvider: KnexProvider) => {
        const sessionKnexRepository = new SessionKnexRepository(
          knexProvider.knex
        );
        return new GetMatchingSession(sessionKnexRepository);
      },
    },
  ],
})
export class GetMatchingSessionModule {}

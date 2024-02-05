import { Module } from '@nestjs/common';
import knex, { Knex } from 'knex';

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

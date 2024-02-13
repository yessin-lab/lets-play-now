import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { GatheringConfigModule } from '../config/gathering-config.module';
import { GatheringConfig } from '../config/gathering-config';

export class KnexProvider {
  constructor(public readonly knex: Knex) {}
}

@Module({
  imports: [GatheringConfigModule],
  controllers: [],
  providers: [
    {
      provide: KnexProvider,
      inject: [ConfigService],
      useFactory: (config: ConfigService<GatheringConfig>) => {
        const { user, password, hostname, port, name } = config.get('database');
        const connectionString = `postgres://${user}:${password}@${hostname}:${port}/${name}`;

        const knexInstance = knex({
          client: 'postgresql',
          connection: { connectionString },
          pool: { min: 2, max: 10 },
          migrations: { tableName: 'knex_migrations' },
        });
        return new KnexProvider(knexInstance);
      },
    },
  ],
  exports: [KnexProvider],
})
export class KnexModule {}

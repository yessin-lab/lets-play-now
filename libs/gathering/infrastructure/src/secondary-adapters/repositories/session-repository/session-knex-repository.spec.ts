import { beforeEach, describe, expect, it } from 'vitest';
import knex, { Knex } from 'knex';
import { SessionKnexRepository } from './session-knex-repository';
describe('session knex repository', () => {
  let orm: Knex;

  beforeEach(async () => {
    orm = knex({
      client: 'postgresql',
      connection: {
        connectionString: 'postgres://admin:admin@172.18.0.3:5432/letsplaynow',
      },
      pool: {
        min: 2,
        max: 10,
      },
      // TODO: add test schema searchPath: ['test'],
      migrations: {
        tableName: 'knex_migrations',
      },
    });

    await orm.migrate.latest().then(async () => {
      const tables = await orm
        .select<{ table_name: string }[]>('table_name')
        .from('information_schema.tables')
        .where({
          table_schema: 'public',
          table_type: 'BASE TABLE',
        });
      const filtredTables = tables.filter(
        ({ table_name }) =>
          !['knex_migrations_lock', 'knex_migrations'].includes(table_name)
      );
      await Promise.all(
        filtredTables.map(
          async ({ table_name }) => await orm(table_name).truncate()
        )
      );
    });
  });

  it('1', async () => {
    const repository = new SessionKnexRepository();
    expect(repository).toBeDefined();
  });
});

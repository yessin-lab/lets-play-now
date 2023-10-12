import { beforeEach, describe, expect, it } from 'vitest';
import knex, { Knex } from 'knex';

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
      //   searchPath: ['test'],
      migrations: {
        tableName: 'knex_migrations',
      },
    });

    await orm.migrate.latest().then(async () => {
      const tables = await orm
        .select<{ table_name: string }[]>('table_name')
        .from('information_schema.tables')
        .where({ table_schema: 'public', table_type: 'BASE TABLE' });
      await Promise.all(
        tables.map(async ({ table_name }) => await orm(table_name).truncate())
      );
    });
  });

  it('1', async () => {
    await orm('session').insert({ id: 'fc926098-310a-4ee2-b897-257f648932ea' });
    const session = await orm<{ id: string }>('users')
      .select()
      .first()
      .where({ id: 'fc926098-310a-4ee2-b897-257f648932ea' });
    expect(session).toBe(2);
  });
});

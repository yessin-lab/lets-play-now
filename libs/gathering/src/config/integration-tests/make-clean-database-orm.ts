import knex, { Knex } from 'knex';

let orm: Knex;

export const getOrm = () => {
  if (orm === undefined) {
    orm = knex({
      client: 'postgresql',
      connection: {
        connectionString:
          process.env['__TEST_CONTAINERS_POSTGRES_CONNECTION_URI'],
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './apps/lets-play-now/migrations',
      },
    });
  }
  return orm;
};

export const migrate = async () => getOrm().migrate.latest();

export const resetDb = async (orm: Knex) => {
  const tables = await orm
    .select<{ table_name: string }[]>('table_name')
    .from('information_schema.tables')
    .where({
      table_schema: 'public',
      table_type: 'BASE TABLE',
    });
  const tablesNames = tables.map(({ table_name }) => table_name).join(', ');
  await orm.raw(`truncate ${tablesNames} cascade;`);
};

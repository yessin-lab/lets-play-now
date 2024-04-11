import knex, { Knex } from 'knex';

export const getOrm = () =>
  knex({
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

export const migrate = async () => {
  const orm = getOrm();
  await orm.migrate.latest();
  await orm.destroy();
};

export const resetDatabase = async (orm: Knex) => {
  const tables = await orm
    .select<{ table_name: string }[]>('table_name')
    .from('information_schema.tables')
    .where({
      table_schema: 'public',
      table_type: 'BASE TABLE',
    });
  const tablesNames = tables.map(({ table_name }) => table_name).join(', ');
  await orm.raw(`truncate ${tablesNames} cascade;`);
  // await Promise.all(
  //   tables.map(async ({ table_name }) => orm(table_name).truncate())
  // );
};

export const getResetedOrm = async () => {
  const orm = getOrm();
  const tables = await orm
    .select<{ table_name: string }[]>('table_name')
    .from('information_schema.tables')
    .where({
      table_schema: 'public',
      table_type: 'BASE TABLE',
    });
  const tablesNames = tables.map(({ table_name }) => table_name).join(', ');
  await orm.raw(`truncate ${tablesNames} cascade;`);
  return orm;
};

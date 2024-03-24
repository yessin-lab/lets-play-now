import knex from 'knex';

export const makeCleanDatabaseOrm = async () => {
  const orm = knex({
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

  return orm;
};

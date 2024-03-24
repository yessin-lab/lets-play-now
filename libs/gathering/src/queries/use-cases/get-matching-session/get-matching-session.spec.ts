import knex, { Knex } from 'knex';
import { GetMatchingSession } from './get-matching-session';

describe('get matching session', () => {
  let orm: Knex;

  beforeEach(async () => {
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

  afterEach(async () => {
    await orm.destroy();
  });

  it('should find sessions by slot', async () => {
    await orm('session').insert([
      {
        id: '32b19477-a418-4aba-9da8-ba953fc38c25',
        address: '16 rue toi meme',
        postal_code: '94300',
        city: 'Vincenneuh',
        start: new Date('2023-09-06T14:30:00'),
        end: new Date('2023-09-06T17:30:00'),
      },
      {
        id: 'bb35309e-fbba-4b6c-b69c-76ccce40898f',
        address: '17 rue des patates',
        postal_code: '94300',
        city: 'Vincenneuh',
        start: new Date('2023-09-06T18:30:00'),
        end: new Date('2023-09-06T22:30:00'),
      },
      {
        id: 'f05841e0-517c-4f5c-aed3-848db4510a99',
        address: '12 avenue toto',
        postal_code: '93100',
        city: 'Montreuil',
        start: new Date('2023-09-06T18:30:00'),
        end: new Date('2023-09-06T22:30:00'),
      },
    ]);
    const start = new Date('2023-09-06T18:00:00');
    const end = new Date('2023-09-06T23:00:00');
    const city = 'Vincenneuh';
    const getMatchingSession = new GetMatchingSession(orm);
    const sessions = await getMatchingSession.handle(start, end, city);

    expect(sessions).toEqual([
      {
        id: 'bb35309e-fbba-4b6c-b69c-76ccce40898f',
        address: '17 rue des patates',
        postal_code: '94300',
        city: 'Vincenneuh',
        start: new Date('2023-09-06T18:30:00'),
        end: new Date('2023-09-06T22:30:00'),
      },
    ]);
  });
});

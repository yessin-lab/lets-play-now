import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import knex, { Knex } from 'knex';
import { SessionKnexRepository } from './session-knex-repository';
import { Session, SessionId, Slot, Location } from '../../../entities';

describe('session knex repository', () => {
  jest.setTimeout(60000);
  let postgresContainer: StartedPostgreSqlContainer;
  let orm: Knex;

  beforeEach(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres').start();
    orm = knex({
      client: 'postgresql',
      connection: {
        connectionString: postgresContainer.getConnectionUri(),
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
    await postgresContainer.stop();
  });

  it('save should insert session into database', async () => {
    const repository = new SessionKnexRepository(orm);

    const sessionId = new SessionId('cf1177c5-28ff-4c17-a1c5-8757b9b479b9');
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const start = new Date('2023-09-06T18:30:00');
    const end = new Date('2023-09-06T22:30:00');
    const slot = new Slot(start, end);
    const session = new Session(sessionId, location, slot);

    await repository.save(session);

    const sessionFound = await orm('session').select().where({
      id: sessionId.asString(),
    });
    expect(sessionFound).toEqual([
      {
        id: sessionId.asString(),
        address: location.getAddress(),
        postal_code: location.getPostalCode(),
        city: location.getCity(),
        start: slot.getStart(),
        end: slot.getEnd(),
      },
    ]);
  });
});

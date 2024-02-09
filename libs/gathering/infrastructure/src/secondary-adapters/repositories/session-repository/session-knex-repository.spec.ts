import {
  Location,
  Session,
  SessionId,
  Slot,
} from '@lets-play-now/gathering-entities';
import knex, { Knex } from 'knex';
import { SessionKnexRepository } from './session-knex-repository';

describe('session knex repository', () => {
  let orm: Knex;

  beforeEach(async () => {
    orm = knex({
      client: 'postgresql',
      connection: {
        connectionString: 'postgres://admin:admin@localhost:5432/letsplaynow',
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
    const repository = new SessionKnexRepository(orm);

    const start = new Date('2023-09-06T18:00:00');
    const end = new Date('2023-09-06T23:00:00');
    const slot = new Slot(start, end);
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const sessions = await repository.findMatchingSessions(slot, location);

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

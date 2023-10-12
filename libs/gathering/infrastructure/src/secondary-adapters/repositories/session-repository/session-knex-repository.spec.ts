import { Location, Session, SessionId, Slot } from '@lets-play-now/gathering-entities'
import knex, { Knex } from 'knex'
import { beforeEach, describe, expect, it } from 'vitest'
import { SessionKnexRepository } from './session-knex-repository'
describe('session knex repository', () => {
  let orm: Knex;

  //TODO: problème config host linux/mac
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

  it('save should insert session into database', async () => {
    const repository = new SessionKnexRepository(orm);

    const sessionId = new SessionId("cf1177c5-28ff-4c17-a1c5-8757b9b479b9")
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    const start = new Date('2023-09-06T18:30:00');
    const end = new Date('2023-09-06T22:30:00');
    const slot = new Slot(start, end);

    const session = new Session(sessionId, location,slot)
    await repository.save(session)

    const sessionFound = await orm("session").select().where({
      id: sessionId.asString(),
    })
    
    expect(sessionFound).toEqual([{
      id: sessionId.asString(),
      address: location.getAddress(),
      postal_code: location.getPostalCode(),
      city: location.getCity(),
      start: slot.getStart(),
      end: slot.getEnd(),
    }]);

  });
});

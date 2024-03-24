import { Knex } from 'knex';
import { GetMatchingSession } from './get-matching-session';
import { makeCleanDatabaseOrm } from '../../../config/test/make-clean-database-orm';

describe('get matching session', () => {
  let orm: Knex;

  beforeEach(async () => {
    orm = await makeCleanDatabaseOrm();
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

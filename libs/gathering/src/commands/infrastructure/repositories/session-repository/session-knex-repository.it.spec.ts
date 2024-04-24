import { SessionKnexRepository } from './session-knex-repository';
import { Session, SessionId, Slot, Location } from '../../../entities';
import {
  getOrm,
  resetDb,
} from '../../../../config/integration-tests/make-clean-database-orm';

describe('session knex repository', () => {
  const orm = getOrm();

  beforeEach(async () => {
    await resetDb(orm);
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

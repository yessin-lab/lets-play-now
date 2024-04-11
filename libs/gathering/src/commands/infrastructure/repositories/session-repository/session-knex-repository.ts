import { SessionRepository } from '../../../application';
import { Knex } from 'knex';
import { Session } from '../../../entities';

export class SessionKnexRepository implements SessionRepository {
  constructor(private readonly knex: Knex) {}

  async save(session: Session): Promise<void> {
    await this.knex('session').insert({
      id: session.id.asString(),
      address: session.location.getAddress(),
      postal_code: session.location.getPostalCode(),
      city: session.location.getCity(),
      start: session.slot.getStart(),
      end: session.slot.getEnd(),
    });
  }
}

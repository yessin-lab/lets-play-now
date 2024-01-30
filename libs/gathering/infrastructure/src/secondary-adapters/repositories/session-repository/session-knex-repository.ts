import { SessionRepository } from '@lets-play-now/application'
import { Location, Session, Slot } from '@lets-play-now/gathering-entities'
import { Knex } from 'knex'

export class SessionKnexRepository implements SessionRepository {
  constructor(private readonly knex: Knex) {}

  async save(session: Session): Promise<void> {
    return this.knex('session').insert({
      id: session.id.asString(),
      address: session.location.getAddress(),
      postal_code: session.location.getPostalCode(),
      city: session.location.getCity(),
      start: session.slot.getStart(),
      end: session.slot.getEnd(),
    });
  }

  async findMatchingSessions(
    slot: Slot,
    location: Location
  ): Promise<Session[]> {
    return this.knex('session')
      .where('start', '>=', slot.getStart())
      .andWhere('end', '<=', slot.getEnd())
      .andWhere('city', '=', location.getCity());
  }
}

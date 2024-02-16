import { Knex } from 'knex';

export class GetMatchingSession {
  constructor(private readonly knex: Knex) {}

  handle(start: Date, end: Date, city: string) {
    return this.knex('session')
      .where('start', '>=', start)
      .andWhere('end', '<=', end)
      .andWhere('city', '=', city);
  }
}

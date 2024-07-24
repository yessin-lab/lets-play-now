import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CreateSessionModule } from './create-session.module';
import { KnexProvider } from '../../setup/database/knex.module';
import { getOrm } from 'libs/gathering/src/config/integration-tests/make-clean-database-orm';
import { Knex } from 'knex';

describe('create-session', () => {
  let app: INestApplication;
  let orm: Knex;

  beforeEach(async () => {
    orm = getOrm();
    const moduleRef = await Test.createTestingModule({
      imports: [CreateSessionModule],
    })
      .overrideProvider(KnexProvider)
      .useValue(new KnexProvider(orm))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST create-session`, async () => {
    await request(app.getHttpServer())
      .post('/create-session')
      .send({
        id: '23e9f57d-f1e3-437c-93c3-bd712234160d',
        location: {
          city: 'La Ferté-Alais',
          postalCode: '91590',
          address: 'rue du vin',
        },
        slot: { start: '2023-09-06T18:30:00', end: '2023-09-06T22:30:00' },
        games: ['Earth', 'Love Letter'],
        table: {
          maxPlayers: 5,
          players: ['Yessin', 'Gabriel', 'Younas', 'Yann'],
        },
      })
      .expect(201);

    const sessionFound = await orm('session').select().where({
      id: '23e9f57d-f1e3-437c-93c3-bd712234160d',
    });
    expect(sessionFound).toEqual([
      {
        id: '23e9f57d-f1e3-437c-93c3-bd712234160d',
        address: 'rue du vin',
        postal_code: '91590',
        city: 'La Ferté-Alais',
        start: new Date('2023-09-06T18:30:00'),
        end: new Date('2023-09-06T22:30:00'),
        games: ['Earth', 'Love Letter'],
      },
    ]);
  });

  afterEach(async () => {
    await app.close();
  });
});

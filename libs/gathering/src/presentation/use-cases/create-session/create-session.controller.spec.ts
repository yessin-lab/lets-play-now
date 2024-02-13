import { CreateSessionSpy, ICreateSession } from '../../../application';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CreateSessionModule } from './create-session.module';
import { Location, SessionId, Slot } from 'libs/gathering/src/entities';

describe('create-session', () => {
  let app: INestApplication;
  let createSession: CreateSessionSpy;

  beforeEach(async () => {
    createSession = new CreateSessionSpy();

    const moduleRef = await Test.createTestingModule({
      imports: [CreateSessionModule],
    })
      .overrideProvider(ICreateSession)
      .useValue(createSession)
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
      })
      .expect(201);

    expect(
      createSession.hasBeenCalledWith({
        id: new SessionId('23e9f57d-f1e3-437c-93c3-bd712234160d'),
        location: new Location('La Ferté-Alais', '91590', 'rue du vin'),
        slot: new Slot(
          new Date('2023-09-06T18:30:00'),
          new Date('2023-09-06T22:30:00')
        ),
      })
    ).toBeTruthy();
  });

  afterEach(async () => {
    await app.close();
  });
});

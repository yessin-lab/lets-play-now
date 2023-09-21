import { CreateSessionSpy, ICreateSession } from '@lets-play-now/application';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { describe, beforeEach, afterEach, it } from 'vitest';
import { CreateSessionModule } from './create-session.module';

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

  it(`/POST create-session`, () => {
    return request(app.getHttpServer())
      .post('/create-session')
      .send({
        location: {
          city: 'LFA',
          postalCode: '91590',
          address: 'Rue du vin',
        },
        slot: { start: '2023-09-06T18:30:00', end: '2023-09-06T22:30:00' },
      })
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });
});

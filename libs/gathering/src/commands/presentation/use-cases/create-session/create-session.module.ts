import { Module } from '@nestjs/common';
import { CreateSessionController } from './create-session.controller';
import { CreateSession, SessionRepository } from '../../../application';
import { SessionKnexRepository } from '../../../infrastructure';
import { KnexModule, KnexProvider } from '../../setup/database/knex.module';

@Module({
  controllers: [CreateSessionController],
  imports: [KnexModule],
  providers: [
    {
      provide: SessionRepository,
      inject: [KnexProvider],
      useFactory: ({ knex }: KnexProvider) => new SessionKnexRepository(knex),
    },
    {
      provide: CreateSession,
      inject: [SessionRepository],
      useFactory: (sessionRepository) => new CreateSession(sessionRepository),
    },
  ],
})
export class CreateSessionModule {}

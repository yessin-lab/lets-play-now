import { Module } from '@nestjs/common';
import { CreateSessionController } from './create-session.controller';
import { CreateSession, ICreateSession } from '../../../../application';
import { SessionKnexRepository } from '../../../secondary-adapters/repositories/session-repository/session-knex-repository';
import { KnexModule, KnexProvider } from '../../setup/database/knex.module';

@Module({
  controllers: [CreateSessionController],
  imports: [KnexModule],
  providers: [
    {
      provide: ICreateSession,
      inject: [KnexProvider],
      useFactory: ({ knex }: KnexProvider) => {
        const repo = new SessionKnexRepository(knex);
        return new CreateSession(repo);
      },
    },
  ],
})
export class CreateSessionModule {}

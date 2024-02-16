import { Module } from '@nestjs/common';
import { GetMatchingSessionController } from './get-matching-session.controller';
import {
  KnexModule,
  KnexProvider,
} from '../../../commands/presentation/setup/database/knex.module';
import { GetMatchingSession } from './get-matching-session';

@Module({
  imports: [KnexModule],
  controllers: [GetMatchingSessionController],
  providers: [
    {
      provide: GetMatchingSession,
      inject: [KnexProvider],
      useFactory: ({ knex }: KnexProvider) => {
        return new GetMatchingSession(knex);
      },
    },
  ],
})
export class GetMatchingSessionModule {}

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { migrate } from './make-clean-database-orm';

export default async function () {
  const postgresContainer = await new PostgreSqlContainer('postgres').start();
  global.postgresContainer = postgresContainer;
  process.env['__TEST_CONTAINERS_POSTGRES_CONNECTION_URI'] =
    postgresContainer.getConnectionUri();
  await migrate();
}

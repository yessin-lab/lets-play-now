// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getOrm } from './make-clean-database-orm';

export default async function () {
  global.postgresContainer.stop();
  await getOrm().destroy();
}

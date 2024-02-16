import { Session } from '../../entities';

export abstract class SessionRepository {
  abstract save(session: Session): Promise<void>;
}

import { Session } from '@lets-play-now/gathering-entities'


export interface SessionRepository {
    save(session: Session): Promise<void>
}
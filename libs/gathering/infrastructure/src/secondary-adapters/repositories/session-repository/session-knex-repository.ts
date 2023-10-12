import { SessionRepository } from "@lets-play-now/application"
import { Session } from "@lets-play-now/gathering-entities"
import { Knex } from "knex"

export class SessionKnexRepository implements SessionRepository {
    constructor(private readonly knex: Knex) {}
    
    async save(session: Session): Promise<void> {
        return this.knex("session").insert({
            id: session.id.asString(),
            address: session.location.getAddress(),
            postal_code: session.location.getPostalCode(),
            city: session.location.getCity(),
            start: session.slot.getStart(),
            end: session.slot.getEnd(),
        })
    }

}

import { Knex } from "knex"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('session', function(t) {
      t.uuid('id').primary();
      t.string('city', 100);
      t.string('postal_code', 100);
      t.string('address', 250);
      t.dateTime('start');
      t.dateTime('end');
    });
  }


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('session');
}


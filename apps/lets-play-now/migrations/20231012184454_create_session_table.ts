import { Knex } from 'knex';

exports.up = async function up(knex: Knex) {
  return knex.schema.createTable('session', function (t) {
    t.uuid('id').primary();
    t.string('city', 100);
    t.string('postal_code', 100);
    t.string('address', 250);
    t.dateTime('start');
    t.dateTime('end');
  });
};

exports.down = async function down(knex: Knex) {
  return knex.schema.dropTable('session');
};

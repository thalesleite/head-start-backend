
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('address').notNullable();
      table.decimal('phone').notNullable();
      table.decimal('type').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
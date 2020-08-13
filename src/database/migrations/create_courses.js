
exports.up = function(knex) {
  return knex.schema.createTable('courses', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('description1').notNullable();
      table.string('description2');
      table.decimal('price').notNullable();
      table.string('type').notNullable();
      table.decimal('duration').notNullable();
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('courses');
};
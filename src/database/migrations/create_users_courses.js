exports.up = function(knex) {
  return knex.schema.createTable('users_courses', function (table) {
      table.increments();

      table.integer('user_id').unsigned();
      table.foreign('user_id').references('Users.id');

      table.integer('course_id').unsigned();
      table.foreign('course_id').references('Courses.id');

      table.integer('level').defaultTo(0);
      table.datetime('deadline').notNullable();
      table.datetime('date_purchase').notNullable();
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('users_courses');
};
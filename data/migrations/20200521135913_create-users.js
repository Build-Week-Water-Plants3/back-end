
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.text("username", 128)
        .unique()
        .notNullable();
        tbl.text("password", 128)
        .unique()
        .notNullable();
        tbl.text("hone Number")
        .notNullable();
    })
    .createTable("species", tbl => {
        tbl.increments();
        tbl.text("scientificName", 255)
        .notNullable();
    })
    .createTable("plants", tbl => {
        tbl.increments();
        tbl.text("nickname", 225)
        .notNullable();
        tbl.text("H2Ofrequency")
        .notNullable();
        tbl.text("image");
        tbl.text("species_scientificName")
        .unsigned()
        .references('scientificName')
        .inTable('species')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl.text("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("plants")
    .dropTableIfExists("species")
    .dropTableIfExists("users");
  
};

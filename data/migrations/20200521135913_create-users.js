
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();

        tbl.text("username", 128)
        .unique()
        .notNullable();

        tbl.text("password", 128)
        .notNullable();
        
        tbl.text("Number")
        .notNullable();
    })

    .createTable("plants", tbl => {
        tbl.increments();
        
        tbl.text("nickname", 225)
        .notNullable();

        tbl.text("H2Ofrequency")
        .notNullable();

        tbl.text("image");

        tbl.text("species_name");

        tbl.text("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("plants")

    .dropTableIfExists("users");
  
};

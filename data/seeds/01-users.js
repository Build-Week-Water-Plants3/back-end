const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'elephant', password: bcrypt.hashSync("test", 10), Number:'555-555-5555'},
        {username: 'monkey', password: bcrypt.hashSync("green", 8), Number:'555-555-5000'},
        {username: 'bear', password: bcrypt.hashSync("purple", 10), Number:'800-555-5555'}
      ]);
    });
};

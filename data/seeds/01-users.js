
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'elephant', password: 'green', Number:'555-555-5555'},
        {username: 'monkey', password: 'violet', Number:'555-555-5000'},
        {username: 'bear', password: 'orange', Number:'800-555-5555'}
      ]);
    });
};

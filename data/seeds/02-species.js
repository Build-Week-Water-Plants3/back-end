
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('species').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('species').insert([
        {name: 'Liliaceae'},
        {name: 'Asteraceae'},
        {name: 'Caryophyllaceae'}
      ]);
    });
};

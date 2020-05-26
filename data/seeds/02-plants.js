
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {nickname: 'Lily',
        H2Ofrequency: 'once a week', 
        image:'https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729514_1280.jpg', 
        species_name: 'Liliaceae', 
        user_id: 2},
        {nickname: 'Tulip', H2Ofrequency: 'water weekly', image:'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg', species_name: 'Liliaceae', user_id: 2},
        {nickname: 'Sunflower', H2Ofrequency: 'water several times a week', image:'https://cdn.pixabay.com/photo/2018/07/15/19/02/sun-flower-3540266_1280.jpg', species_name: 'Asteraceae', user_id: 1},
        {nickname: 'Babys breath', H2Ofrequency: 'water at least once a week', image:'https://cdn.pixabay.com/photo/2017/08/08/03/54/babys-breath-2610214_1280.jpg', species_name: 'Caryophyllaceae', user_id: 3},
        {nickname: 'Common Dasiy', H2Ofrequency: 'do not require constant watering only water when soil is dry', image:'https://cdn.pixabay.com/photo/2013/07/11/18/34/daisy-144677_1280.jpg', species_name: 'Asteraceae', user_id: 1},
      ]);
    });
};
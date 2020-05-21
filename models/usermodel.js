const db = require('../data/dbconfig');

function getPlants(id) {
    return db('plants')
    .join('users', 'plants.user_id', 'user.id')
    .join('species', 'plants.species_name', 'species.name' )
    .select('plants.id', 'plants.H2Ofrequency', 'plants.image', 'plants.species_name')
    .where({'plants.user_id': id})

}

module.exports = {
    getPlants
}
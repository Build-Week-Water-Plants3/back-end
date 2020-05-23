const db = require('../data/dbconfig');

function getPlants(id) {
    return db('plants')
    .join('users', 'plants.user_id', 'user.id')
    .join('species', 'plants.species_name', 'species.name' )
    .select('plants.id', 'plants.nickname','plants.H2Ofrequency', 'plants.image', 'plants.species_name')
    .where({'plants.user_id': id})

}

function getUserById(id) {
    return db('users').select('username', 'number')
    .where({id})
    .first();
}

function getPlantById(plantid) {
    return db('plants').where({id: plantid}).first();
}

function addPlants(plant) {
    return db('plants').insert(plant)
}

function updatePlant(plant, plantid) {
    return db('plants')
    .update(plant)
    .where({id: plantid})
}

function removePlants(plantid) {
    return db('plants').where({id: plantid}).del();
}

module.exports = {
    getPlants,
    getUserById,
    getPlantById,
    addPlants,
    updatePlant,
    removePlants
}
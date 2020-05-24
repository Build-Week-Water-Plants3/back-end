const db = require('../data/dbconfig');

function getPlants(id) {
    return db('plants').where('user_id', id).orderBy('id')
}

function getUserById(id) {
    return db('users')
    .where("id", id)
    .first();
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

function find() {
    return db('users').select('id', 'username', 'password');
}

module.exports = {
    getPlants,
    getUserById,
    addPlants,
    updatePlant,
    removePlants,
    find
}
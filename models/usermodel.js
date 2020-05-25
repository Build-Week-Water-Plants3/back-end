const db = require('../data/dbconfig');

function getPlants(id) {
    return db('plants').where('user_id', id).orderBy('id')
}

function getUserById(id) {
    return db('users')
    .where("id", id)
    .first();
}

function addPlant(plantData) {
    return db('plants').insert(plantData, 'id').then((ids) => {
        const [id] = ids;
        return db('plants').where({id}).first().then((obj) => {
            return getPlants(obj.user_id);
        })
    })
}


async function insert(plant) {
    const [id] = await db("plants").insert(plant);
    return findById(id)
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
    insert,
    updatePlant,
    removePlants,
    find,
    addPlant
}
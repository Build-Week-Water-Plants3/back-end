const router = require("express").Router();
const Users = require("../models/usermodel");
const restricted = require('../middleware/restricted-middleware')

// works
router.get("/", restricted, (req,res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})
// works
router.get("/:id", restricted, async(req, res, next) => {
    try {
        const User = await Users.getUserById(req.params.id);
        const plants = await Users.getPlants(req.params.id);
        if(User) {
            return res.status(200).json({
                ...User, plants
            })
        }
        res.json(User)
    }catch(err) {
        next(err)
    }
})
//works

// works
router.post("/:id/plants", restricted, async (req, res) => {
    const {id } = req.params;
    const plantData = {...req.body, user_id: id}
    try {
        const newPlant = await Users.addPlant(plantData);
        res.status(201).json(newPlant);
    } catch(err) {
        res.status(500).json({error: 'cannot add plant'})
    }
})
// works
router.put("/:plants/:plantid", restricted, async (req, res) => {
    const {_, plantid} = req.params;
    const plantData = req.body;
    try {
        const updated = await Users.updatePlant(plantData, plantid);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({error: "Plant cannot be updated"})
    }
});
//works
router.delete('/:plants/:plantid', restricted, (req, res) => {
    const {plantid} = req.params;

    Users.removePlants(plantid)
    .then(deleted => {
        if(deleted) {res.json({removed: deleted})
    } else {
        res.status(404).json({Message: 'Could not find plant with given id'})
    }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete plant'})
    })
})



module.exports = router;

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
        const User = await Users.getUserById(req.params.id)
        if(!User) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json(User)
    }catch(err) {
        next(err)
    }
})
//works
router.get('/:id/plants', (req, res) => {
    const {id} = req.params;
    Users.getPlants(id)
    .then(plants => {
        if(plants.length) {
            res.json(plants);
        } else {
            res.status(404).json({message: 'User has no plants'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to get plants'});
    })
})
// works
router.post("/:id/plants", async (req, res) => {
    const {id } = req.params;
    const plantData = {...req.body, user_id: id}
    try {
        const newPlant = await Users.addPlant(plantData);
        res.status(201).json(newPlant);
    } catch({ name, message}) {
        res.status(500).json({name, message});
    }

})
// works
router.put("/:plants/:plantid", async (req, res) => {
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
router.delete('/:plants/:plantid', (req, res) => {
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

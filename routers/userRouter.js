const router = require("express").Router();
const Users = require("../models/usermodel");

// works
router.get("/", (req,res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})
// works
router.get("/:id", async(req, res, next) => {
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

router.post("/:id/plants", (req, res) => {
    const newPlant = req.body;
    Users.addPlants(newPlant)
    .then(plant => {
        if(plant.nickname && plant.H20frequency && plant.species_name) {
            res.status(201).json(plant);
        } else {
            res.status(500).json({Message: 'Missing fields'})
        }
    })
    .catch(err => {
        res.status(500).json({Message: 'Cannot add plant'})
    })
})

router.put("/:plants/:plantid", (req, res) => {
    const {nickname, H20frequency, species_name, user_id} = req.params;
    const plant = req.body;

    Users.getPlantById(plantid)
    .then(plant => {
        if(plant) {
            Users.updatePlant(plant, plantid)
            .then(updatedPlant => {
                res.json(updatedPlant);
            })
        } else {
            res.status(404).json({Message: 'Cannot find plant with given id'})
        }
    })
    .catch( err => {
        res.status(500).json({Message: 'Failed to update plant'})
    })
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

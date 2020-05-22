const router = require("express").Router;
const Users = require("../models/usermodel");

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const user = await Users.getUserById(id);
        const plants = await Users.getPlants(id);

        if(user) {
            res.status(200).json({...user, plants});
        } else {
            res.status(500).json({error: "User does not exist"});
        }
    } catch (err) {
        res.status(404).json({error: "User not found"})
    }
});

router.post("/:id/plants", (req, res) => {
    const newPlant = req.body;
    Users.addPlants(newPlant)
    .then(plant => {
        if(plant.nickname && plant.H20frequency && plant.species) {
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
})



module.exports = router;

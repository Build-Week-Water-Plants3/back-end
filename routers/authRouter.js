const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModels");
const secrets = require("../secret");

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.passowrd, 10);
    user.passowrd = hash

    Auth.add(user).then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
    let {username, passowrd} = req.body;

    Auth.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(passowrd, user.passowrd)) {
            const token = genToken(user);
            res.status(200).json({message: `Welcome ${user.username}`, 
            jwt_token: token})
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.get('/logout', (req, res) => {
    req.session.destory((err) => {
        if(err) {
            res.send("Your still logged in");
        } else {
            res.send("logged out");
        }
    })
});

function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '30 min'
    }
    return jwt.sign(payload, secret, options);
}

module.exports = router;
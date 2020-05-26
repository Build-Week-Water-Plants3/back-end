const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModels");
const secrets = require("../secret");

// works
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Auth.add(user).then(saved => {
        res.status(201).json({saved});
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Auth.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
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
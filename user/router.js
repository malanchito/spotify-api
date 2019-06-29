const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('./model');

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: req.body.password
    }
    User.create(user)
    .then(user => { 
                 res.status(201)
                    .json({
                    message: "New user added",
                    "new user": user.email
                })
        })
    .catch(err => next(err))
})

module.exports = router;
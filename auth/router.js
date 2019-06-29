const express = require('express');
const {toJWT,toData} = require('./jwt')
const User = require('../user/model')
const auth = require('./middleware')
const bcrypt = require('bcrypt');
const router = express.Router()

router.post('/tokens', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
        User.findOne({
                where: {
                    email: email
                }
            })
        .then(entity => {
            if (!entity) {
                res
                    .status(400)
                    .send({
                        message: 'User does not exist'
                    })
                }
            if (bcrypt.compareSync(password, entity.password)) {
                res
                    .send({
                            message: "Sign In correct, here's a token!, your id is "+entity.id,
                            jwt: toJWT({ userId: entity.id })
                    })
            } else {
                res
                    .status(400)
                    .send({
                            message: 'Password was incorrect'
                    })
                }
            })
        .catch(err => {
            console.error(err)
            res
                .status(500)
                .send({
                        message: 'Something went wrong'
                    })
            })
    } else {
        res
            .status(400)
            .send({
                message: "Please supply a valid email and password"
            })
    }
})

router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
  })
module.exports = router
const { request } = require('express')
const express = require('express')

const router = express.Router()
const bcrypt = require('bcryptjs')
const User=require('../models/User')
 



router.post('/register', (req, res, next)=>{
    User.findOne({username:req.body.username})
    .then(user => {
        if(user!=null){
            let err = new Error(`User ${req.body.username} already exist.`)
            return next(err)
        }
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err) return next(err)
                let user = new User()
                user.username = req.body.username
                user.password = hash
                user.save().then(user => {
                    res.status(201).json({
                        'status': 'User reqistered successfully',
                        userId: user._id,
                        username: user.username
                    })
                }).catch(next)
            } )
    }).catch(next)
    // res.send('post request')
})


router.post('/login', (req, res, next)=>{
    res.send('login request')
})

module.exports = router

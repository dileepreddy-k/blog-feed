const express = require('express')
const router = express.Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/middleware');

// add this in config file
const secret ="blog-feed";

router.post('/register',(req,res) => {
    const {name, email, password,} = req.body;

    User.findOne({email}).then(user => {
        if(user){
            return res.status(421).json({'error':'Email already exists'})
        }else{
            const user = new User({name,email,password});
            user.save().then( user => {
                res.status(200).json({'message':'user created successfully'})
            })
            .catch(err => {
                res.status(422).json(`error:${err.message}`);
            })
        }
    })
})

router.post('/login',(req,res) =>{
    const {email,password} = req.body;
    User.findOne({email}).then(user =>{
        if(!user){
            res.status(421).json({error:'Incorrect email or password'})
        }else{
            user.isCorrectPassword(password,function(err,same){
                if(err){
                    res.status(500).json({error:'Internal error please try again'})
                }else if (!same){
                    res.status(421).json({error:'Incorrect email or password'})
                }else{
                    const payload = { email }
                    const token = jwt.sign(payload, secret, {expiresIn:'1h'})
                    res.cookie('token',token).status(200).json(user);
                }
            })
        }
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})

router.post('/checkToken', withAuth, function(req, res) {
    const email = req.email
    User.findOne({email}).then(user => {

        res.status(200).json(user)
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
});

module.exports = router;
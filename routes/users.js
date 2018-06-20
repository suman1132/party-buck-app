const express = require('express');
const router = express.Router();

const User = require('../models/user');

const passport = require('passport');
const jwt = require('jsonwebtoken');




// Register
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');
  let newUser = new User({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    password : req.body.password
  });

  User.addUser(newUser, (err, user) =>{
    if(err){
      res.json({success : false, message : 'Failed to Register'});
    }else{
      res.json({success : true, message : 'Registered'});
    }
  });
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE');
});


// Profile
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});


// Validate
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});


module.exports = router;

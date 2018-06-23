const express = require('express');
const router = express.Router();

const User = require('../models/user');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');


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
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success : false, message : 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret,{
          expiresIn : 400000
        });
        res.json({
          success : true,
          token : 'JWT ' + token,
          user : {
            id : user._id,
            name : user.name,
            username : user.username,
            email : user.email
          }
        });
      } else {
        return res.json({success : false, message : 'Password Invalid'});
      }
    });

  });

});


// Profile
router.get('/profile' ,passport.authenticate('jwt', {session:false}) , ( req, res, next) => {
  console.log('Hello');
  res.json({user: req.user});
});


// Validate
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});


module.exports = router;

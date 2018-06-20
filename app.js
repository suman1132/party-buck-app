const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database : '+config.database);

});

mongoose.connection.on('error', (err) => {
  console.log('Error in Connection to database : '+err);

});

const app = express();

const port = 3000;

const users = require('./routes/users');

// Cors Middleware
app.use(cors());

// Set static folder for front Endpoint
app.use(express.static(path.join(__dirname, 'public')));


// Body parser Middleware
app.use(bodyParser.json());

app.use('/users',users);

app.get('/', (req, res)=>{
  res.send('Invalid Endpoint');
});

app.listen(port, () =>{
  console.log('Server Running at port : ' + port);
});

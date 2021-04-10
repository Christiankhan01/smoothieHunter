const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');



const app = express();

// middleware
app.use(express.static('public'));
//takes json data and passes it to a javascript object to use inside code
//can be accessed in req handlers
app.use(express.json()); 
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

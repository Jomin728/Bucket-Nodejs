const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const authRoutes = require('./routes/auth');
const User = require("./models/user");


const MongoStore = require('connect-mongo');
const mongoString = 'mongodb+srv://jomin3:pfcHUWgM2oqzQtuo@cluster0.bumc5io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoString);
const db = mongoose.connection;


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'jomin729',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: db.client.s.url })
  }));
  
  const strategy = new localStrategy(User.authenticate())
  passport.use(strategy);
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(authRoutes)

//   app.post('/register', function (req, res) {
//     User.register(
//       new User({ 
//         email: req.body.email, 
//         username: req.body.username 
//       }), req.body.password, function (err, msg) {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send({ message: "Successful" });
//         }
//       }
//     )
//   })



//   app.post('/login', passport.authenticate('local', { 
//     failureRedirect: '/login-failure', 
//     successRedirect: '/login-success'
//   }), (err, req, res, next) => {
//     if (err) next(err);
//   });

//   app.get('/login-failure', (req, res, next) => {
//     console.log(req.session);
//     res.send('Login Attempt Failed.');
//   });  

//   app.get('/login-success', (req, res, next) => {
//     console.log(req.session);
//     res.send('Login Attempt was successful.');
//   });
  
  app.listen(8000, () => { console.log('Server started.') });

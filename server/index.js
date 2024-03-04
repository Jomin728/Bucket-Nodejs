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
const cookieParser = require("cookie-parser");


const MongoStore = require('connect-mongo');
const mongoString = 'mongodb+srv://jomin3:pfcHUWgM2oqzQtuo@cluster0.bumc5io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoString);
const db = mongoose.connection;

// const allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

const app = express();
// app.use(cookieParser());
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
  
  app.listen(8000, () => { console.log('Server started.') });

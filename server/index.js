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
const setResponseHeaders = require('./utils/setHeaders')
const MongoStore = require('connect-mongo');
const mongoString = 'mongodb+srv://jomin3:pfcHUWgM2oqzQtuo@cluster0.bumc5io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoString);
const db = mongoose.connection;

const allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];
const corsOptions = {
  origin: function (origin, callback) {
    
    if (allowedOrigins.includes(origin)) {
        console.log(origin)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{ cors:{ origin: "http://localhost:4200", credentials: true }
});

global.io = io;


// app.options('*', cors(corsOptions));
// app.options('*', cors())

app.use(cors(corsOptions))
// app.use(setResponseHeaders)
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'jomin729',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: db.client.s.url }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 6
    }
  }));
  
  const strategy = new localStrategy(User.authenticate())
  passport.use(strategy);
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(authRoutes)

  io.on('connection',socket => {
    let id =socket.id
    console.log('user connected');
    socket.on('disconnect', () => {
      socket.broadcast.emit('clientdisconnect', id);
    });
  })
  
  server.listen(8000, () => { console.log('Server started.') });

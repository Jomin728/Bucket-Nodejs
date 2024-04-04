const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const notificationRoutes = require('./routes/notification');
const cookieParser = require("cookie-parser");
const mongoString = 'mongodb+srv://jomin3:pfcHUWgM2oqzQtuo@cluster0.bumc5io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoString);
const db = mongoose.connection;
const allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];
const corsOptions = {
  origin:true,
  credentials: true
};
const app = express();
const server = require('http').createServer(app);
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(notificationRoutes)
server.listen(3000, () => { console.log('Server started.') });

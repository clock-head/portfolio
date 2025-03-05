const path = require('path');
const https = require('https');
const fs = require('fs');

let config;

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  config = require('config');
}

const productionDBConfig = {
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  address: process.env.DB_ADDRESS,
  sessionSecret: process.env.SESSION_SECRET,
};
const dbConfig =
  process.env.NODE_ENV === 'development'
    ? config.get('database')
    : productionDBConfig;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const setAllowAccessControl = require('./util/cors').setAllowAccessControl;

const MONGO_URI = `mongodb://${dbConfig.address}:${dbConfig.port}/${dbConfig.database}?`;

const app = express();

const options = {
  key: fs.readFileSync('/etc/ssl/clockheadcerts/privkey.pem'),
  cert: fs.readFileSync('/etc/ssl/clockheadcerts/fullchain.pem'),
};

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const adminRoutes = require('./routes/admin');
const blogRoutes = require('./routes/blog');
const themeRoutes = require('./routes/theme');
const authRoutes = require('./routes/auth');

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions',
});

store.on('error', function (error) {
  console.log(error);
});

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: dbConfig.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/1.0/admin', adminRoutes);
app.use('/api/1.0/blog', blogRoutes);
app.use('/api/1.0/auth', authRoutes);
app.use('/api/1.0/themes', themeRoutes);

// app.use(errorController.handleError);

// mongoConnect((client) => {
//   // console.log(client);
//   app.listen(3001);
// });

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('connected, 3000');
      app.listen(3000);
    }

    if (process.env.NODE_ENV === 'production') {
      https.createServer(options, app).listen(443, () => {
        console.log('HTTPS Server running on port 443.');
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;

// app.listen(3000);

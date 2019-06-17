const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const { db, port, sessionSecret } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: sessionSecret,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${db}`);
});
mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${db}`);
});

app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(errorHandler);

module.exports = app;

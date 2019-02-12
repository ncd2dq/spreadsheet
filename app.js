//https://codeburst.io/node-js-by-example-part-2-dad2af5b7012

//npm install ___ --save
//--save makes node put the package in your package.json file

const express = require('express');
const session = require('express-session');

// For form data
const bodyParser = require('body-parser');

// Requiring a directory looks for index.js or entry point specified in package.json
process.env.NODE_ENV = 'dev';

const config = require('./config');
const routes = require('./src/server/routes');

const app = express();

app.use(session({secret:'DEVELOPMENT'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Application level middleware - will be called with every request
app.use((req, res, next) => {
  console.log('Request made');
  next();
});

routes(app);

app.listen(config.env.port, () => console.log('Online!'));

module.exports = exports = app

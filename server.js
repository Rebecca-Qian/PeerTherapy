'use strict';

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));


const server = app.listen(port);
require('./peer/config')(app, server);
require('./backend/routes')(app);

console.log(`Listen on port ${port}`);

exports = module.exports = app;
    
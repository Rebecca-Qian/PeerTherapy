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

require('./backend/routes')(app);


app.listen(port);

console.log(`Listen on port ${port}`);

exports = module.exports = app;
    
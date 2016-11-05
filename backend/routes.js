'use strict';

const _ = require('lodash');
const path = require('path');

module.exports = function(app) {

  // Catch all for now.
  app.get('*', (req, res) => res.sendFile(path.resolve('index.html')));
};

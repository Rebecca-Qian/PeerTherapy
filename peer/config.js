'use strict';

const _ = require('lodash');
const ExpressPeerServer = require('peer').ExpressPeerServer;

module.exports = function(app, server) {
  const peerServer = ExpressPeerServer(server, { debug: true });
  app.use('/peerjs', peerServer);

  let ids = {
    patientIds: [],
    guideIds: []
  };

  function addToList(inputList, inputId) {
    if (!_.includes(inputList, inputId)) inputList.push(inputId);
  }

  peerServer.on('connection', function(peerId) {
    if (_.includes(peerId, 'patient')) addToList(ids.patientIds, peerId);
    else if (_.includes(peerId, 'guide')) addToList(ids.guideIds, peerId);
  });

  app.get('/api/peerIds',
    (req, res) => {
      res.status(200).json(ids);
    }
  );

};
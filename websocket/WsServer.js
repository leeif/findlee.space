var Task = require('../tool/Task');
var WsManager = require('./WsManager');

// primitive 
var manager;

/**
 * @author lee
 * @param {object} httpServer 
 * @param {object} db : database db 
 * @param {object} redis : redis client 
 */
function WsServer(httpServer, db, redis){
  var self;
  manager = new WsManager(this, db, redis);
  self = this;
  self.db = db;
  self.redis = redis;
  self.io = require('socket.io')(httpServer);
  self.task = null;

  self.uploadCoordinates = self.io.of('/uploadCoordinates').
                                   on('connection', function(socket){
    console.log('client connected');

    socket.on('uploadUserId', function(userId){
      console.log('upload userId');
      manager.setUserInfoInCache(userId, socket.id);
	  });

	  socket.on('uploadCoordinates', function(data){
      console.log('upload coordinates');
      var uploadData = JSON.parse(data);
      manager.setCoordinates(uploadData.userId, uploadData.coordinates, socket.id);
	  });
    
    socket.on('disconnect', function(){
      console.log('client disconnect');
      manager.removeUserInfoInCache(socket.id);
	  });
  });
}

WsServer.prototype.startBackgroundWork = function(interval){
  var self = this;
  console.log('websocket background work start...');
  self.task = new Task(function(){
    manager.nearbyClientsHandler();
  }, interval);
  self.task.start();
};

WsServer.prototype.stopBackgroundWork = function(){
  var self = this;
  console.log('wsServer background work stop');
  if(self.task){
	  self.task.stop();
  }
};

module.exports = WsServer;


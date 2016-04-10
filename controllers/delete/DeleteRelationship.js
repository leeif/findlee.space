var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/DeleteManager');

function DeleteRelationship() {
  Base.call(this);
}

util.inherits(DeleteRelationship, Base);

DeleteRelationship.prototype.run = function(req, res, next) {
  DeleteRelationship.super_.prototype.run.call(this, req, res);
  var manager = Manager.getInstance(req.db, req.redis);
  manager.deleteRelationship(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = DeleteRelationship;
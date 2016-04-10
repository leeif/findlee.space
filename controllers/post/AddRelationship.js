var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/PostManager');

function AddRelationship() {
  Base.call(this);
}

util.inherits(AddRelationship, Base);

AddRelationship.prototype.run = function(req, res, next) {
  var manager = Manager.getInstance(req.db, req.redis);
  AddRelationship.super_.prototype.run.call(this, req, res);
  manager.addRelationship(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = AddRelationship;
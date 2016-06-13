var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function AddRelationship() {
  Base.call(this);
  this.name = 'AddRelationship';
}

util.inherits(AddRelationship, Base);

AddRelationship.prototype.run = function(req, res, next) {
  AddRelationship.super_.prototype.run.call(this, req, res);
  Manager.Post(req.db).addRelationship(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = AddRelationship;
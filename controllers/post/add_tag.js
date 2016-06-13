var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function AddTag() {
  Base.call(this);
  this.name = 'AddTag';
}

util.inherits(AddTag, Base);

AddTag.prototype.run = function(req, res, next) {
  AddTag.super_.prototype.run.call(this, req, res);
  Manager.Post(req.db).addTag(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.tag);
    }
  });
};

module.exports = AddTag;
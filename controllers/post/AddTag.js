var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/PostManager');

function AddTag() {
  Base.call(this);
}

util.inherits(AddTag, Base);

AddTag.prototype.run = function(req, res, next) {
  var manager = Manager.getInstance(req.db, req.redis);
  var statusCode;
  AddTag.super_.prototype.run.call(this, req, res);
  manager.addTag(req.body, function(err, result) {
    if (err) {
      statusCode = 500;
      res.status(statusCode).json(err);
    } else {
      statusCode = 200;
      res.status(statusCode).json({
        mid: result.insertId
      });
    }
  });
};

module.exports = AddTag;
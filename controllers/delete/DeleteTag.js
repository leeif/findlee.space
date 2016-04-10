var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/DeleteManager');

function DeleteTag() {
  Base.call(this);
}

util.inherits(DeleteTag, Base);

DeleteTag.prototype.run = function(req, res, next) {
  DeleteTag.super_.prototype.run.call(this, req, res);
  var mid = req.body.mid;
  var manager = Manager.getInstance(req.db, req.redis);
  var statusCode;
  manager.deleteTag(mid, function(err, result) {
    if (err) {
      statusCode = 500;
    } else {
      statusCode = 200;
    }
    res.status(statusCode).json(result);
  });
};

module.exports = DeleteTag;
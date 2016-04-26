var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function GetTag() {
  Base.call(this);
}

util.inherits(GetTag, Base);

GetTag.prototype.run = function(req, res, next) {
  GetTag.super_.prototype.run.call(this, req, res);
  var mid = req.query.mid;
  Manager.Get(req.db).getTags(mid, function(err, result) {
    if (!err) {
      res.status(200).json(result.tags);
    }
  });
};

module.exports = GetTag;

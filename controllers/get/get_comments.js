var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function GetComments() {
  Base.call(this);
  this.name = 'GetComments';
}

util.inherits(GetComments, Base);

GetComments.prototype.run = function(req, res, next) {
  GetComments.super_.prototype.run.call(this, req, res);
  Manager.Get(req.db).getComments(req.params.cid, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        comments: result.comments
      });
    }
  });
};

module.exports = GetComments;
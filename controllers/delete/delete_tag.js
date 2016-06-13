var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function DeleteTag() {
  Base.call(this);
  this.name = 'DeleteTag';
}

util.inherits(DeleteTag, Base);

DeleteTag.prototype.run = function(req, res, next) {
  DeleteTag.super_.prototype.run.call(this, req, res);
  var mid = req.body.mid;
  Manager.Delete(req.db).deleteTag(mid, function(err, result) {
    console.log(err);
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = DeleteTag;
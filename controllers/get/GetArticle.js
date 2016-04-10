var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/GetManager');

function GetArticle() {
  Base.call(this);
}

util.inherits(GetArticle, Base);

GetArticle.prototype.run = function(req, res, next) {
  GetArticle.super_.prototype.run.call(this, req, res);
  var cid = req.query.cid;
  var manager = Manager.getInstance(req.db, req.redis);
  manager.getArticle(cid, function(err, result) {
    if (!err) {
    	result.formatMark = null;
      res.status(200).json(result);
    }
  });
};

module.exports = GetArticle;
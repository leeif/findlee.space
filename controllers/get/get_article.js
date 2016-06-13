var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function GetArticle() {
  Base.call(this);
  this.name = 'GetArticle';
}

util.inherits(GetArticle, Base);

GetArticle.prototype.run = function(req, res, next) {
  GetArticle.super_.prototype.run.call(this, req, res);
  var ip = req.ip;
  Manager.Get(req.db, req.redis).getArticle(req.query.cid, ip, function(err, result) {
    if (err) {
      res.status(500).json(err);
    }else{
      result.article.html = null;
      res.status(200).json(result.article);
    }
  });
};

module.exports = GetArticle;
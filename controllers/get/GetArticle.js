var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function GetArticle() {
  Base.call(this);
}

util.inherits(GetArticle, Base);

GetArticle.prototype.run = function(req, res, next) {
  GetArticle.super_.prototype.run.call(this, req, res);
  Manager.Get(req.db).getArticle(req.query.cid, function(err, result) {
    if (err) {
      res.status(500).json(err);
    }else{
      result.article.html = null;
      res.status(200).json(result.article);
    }
  });
};

module.exports = GetArticle;
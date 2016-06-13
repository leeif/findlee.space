var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function GetArticles() {
  Base.call(this);
  this.name = 'GetArticles';
}

util.inherits(GetArticles, Base);

GetArticles.prototype.run = function(req, res, next) {
  GetArticles.super_.prototype.run.call(this, req, res);
  Manager.Get(req.db).getArticles(req.pageIndex, function(err, result) {
    if (!err) {
      res.status(200).json(result.articles);
    }
  });
};

module.exports = GetArticles;
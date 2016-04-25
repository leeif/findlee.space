var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function BlogIndex() {
  Base.call(this);
}

util.inherits(BlogIndex, Base);

BlogIndex.prototype.run = function(req, res, next) {
  BlogIndex.super_.prototype.run.call(this, req, res);
  Manager.Get(req.db).getArticles(function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogIndex.html', {
        articles: result.articles,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogIndex;

var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function BlogArticle() {
  Base.call(this);
  this.name = 'BlogArticle';
}

util.inherits(BlogArticle, Base);

BlogArticle.prototype.run = function(req, res, next) {
  BlogArticle.super_.prototype.run.call(this, req, res);
  if(isNaN(parseInt(req.params.cid))){
    next();
  }
  Manager.Get(req.db, req.redis).getArticle(req.params.cid, req.ip, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogArticle.html', {
        article: result.article,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogArticle;
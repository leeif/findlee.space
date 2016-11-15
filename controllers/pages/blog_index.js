var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function BlogIndex() {
  Base.call(this);
  this.name = 'BlogIndex';
}

util.inherits(BlogIndex, Base);

BlogIndex.prototype.run = function(req, res, next) {
  BlogIndex.super_.prototype.run.call(this, req, res);
  console.log(req.query.pageIndex);
  Manager.Get(req.db).getArticles(req.query.pageIndex, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogIndex.html', {
        data: result.data,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogIndex;

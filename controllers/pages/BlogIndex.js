var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/GetManager');

function BlogIndex() {
  Base.call(this);
}

util.inherits(BlogIndex, Base);

BlogIndex.prototype.run = function(req, res, next) {
  BlogIndex.super_.prototype.run.call(this, req, res);
  var manager = Manager.getInstance(req.db, req.redis);
  manager.getArticle(null, function(err, blogList) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogIndex.html', {
        blogList: blogList,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogIndex;

var util = require('util');
var Base = require('../base_controller');

function BlogAdmin() {
  Base.call(this);
  this.name = 'BlogAdmin';
}

util.inherits(BlogAdmin, Base);

BlogAdmin.prototype.run = function(req, res, next) {
  BlogAdmin.super_.prototype.run.call(this, req, res);
  res.status(200).render('blog/blogAdmin.html', {
  	host : req.headers.host
  });
};

module.exports = BlogAdmin;

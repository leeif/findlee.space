var util = require('util');
var Base = require('../base_controller');

function BlogLogin() {
  Base.call(this);
  this.name = 'BlogIndex';
}

util.inherits(BlogLogin, Base);

BlogLogin.prototype.run = function(req, res, next) {
  BlogLogin.super_.prototype.run.call(this, req, res);
  res.status(200).render('blog/blogLogin.html', {
    host: req.headers.host
  });
};

module.exports = BlogLogin;
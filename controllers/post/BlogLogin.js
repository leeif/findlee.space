var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/PostManager');

function BlogLogin() {
  Base.call(this);
}

util.inherits(BlogLogin, Base);

BlogLogin.prototype.run = function(req, res, next) {
  var manager = Manager.getInstance(req.db, req.redis);
  BlogLogin.super_.prototype.run.call(this, req, res);
  manager.blogLogin(req.body, function(err, result) {
    if (err) {

    } else {
      res.redirect('/blog/admin');
    }
  });
};

module.exports = BlogLogin;

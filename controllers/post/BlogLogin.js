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
  manager.blogLogin(req.body, function(err, uid) {
    if (err) {
      res.status(500).json(err);
    } else {
      req.session.login = true;
      req.session.uid = uid;
      res.status(200).json({
        redirect: 'http://' + req.headers.host + '/blog/admin/'
      });
    }
  });
};

module.exports = BlogLogin;

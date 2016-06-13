var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function BlogLogin() {
  Base.call(this);
  this.name = 'BlogLogin';
}

util.inherits(BlogLogin, Base);

BlogLogin.prototype.run = function(req, res, next) {
  BlogLogin.super_.prototype.run.call(this, req, res);
  Manager.Post(req.db).login(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      req.session.login = true;
      req.session.uid = result.uid;
      req.session.screenName = result.screenName;
      req.session.type = result.type;
      res.status(200).json({
        redirect: result.redirect
      });
    }
  });
};

module.exports = BlogLogin;

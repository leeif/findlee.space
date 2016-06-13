function RequireLogin(){
  this.name = 'requireLogin';
}

RequireLogin.prototype.requireLogin = function(){
  return function(req, res, next){
    if (req.session.login) {
      next();
    } else {
      res.redirect('/blog/admin/login');
    }
  };
};

module.exports = RequireLogin;

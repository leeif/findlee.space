module.exports = function() {
  return function(req, res, next) {
    if (req.session.login) {
      next();
    } else {
      res.redirect('/blog/admin/login');
    }
  };
};

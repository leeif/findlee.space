module.exports = function() {
  return function(req, res, next) {
    console.log(req.session);
    if (req.session.login) {
      next();
    } else {
      next(new Error('Please Login'));
    }
  };
};

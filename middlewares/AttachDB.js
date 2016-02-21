module.exports = function(db){
  return function(req, res, next){
    req.db = db;
    next();
  };
};
function AttachDB(){
  this.name = 'attachDB';
}

AttachDB.prototype.attachDB = function(db){
  return function(req, res, next){
    req.db = db;
    next();
  };
};

module.exports = AttachDB;
function AttachRedis(){
  this.name = 'attachRedis';
}

AttachRedis.prototype.attachRedis = function(redis){
  return function(req, res, next){
    req.redis = redis;
    next();
  };
};

module.exports = AttachRedis;

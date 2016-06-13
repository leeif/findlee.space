function BlogVistor(){
  this.name = 'blogVistor';
}

BlogVistor.prototype.blogVistor = function(){
  return function(req, res, next){
    req.redis.visitor.incrementBlogVisitor().then(function(result){
      next();
    }, function(err){
      next(err);
    });
  };
};

module.exports = BlogVistor;
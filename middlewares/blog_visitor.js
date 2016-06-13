function BlogVistor(){
  this.name = 'blogVistor';
}

BlogVistor.prototype.blogVistor = function(){
  return function(req, res, next){
    console.log("blog_visitor");
    req.redis.visitor.incrementBlogVisitor().then(function(result){
      next();
    }, function(err){
      next(err);
    });
  };
};

module.exports = BlogVistor;
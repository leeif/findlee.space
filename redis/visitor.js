function Vistor(redis, prefix) {
  this.client = redis;
  this.prefix = prefix;
}

Vistor.prototype.getArticle = function(articleId, ip) {
  var key = this.prefix + '_article_' + articleId + '_vistors';
  return this.client.hget(key, ip);
};

Vistor.prototype.setArticle = function(articleId, ip) {
  var key = this.prefix + '_article_' + articleId + '_vistors';
  var now = Date.now();
  return this.client.hset(key, ip, now);
};

Vistor.prototype.getBlogVisitor = function(ip) {
  var key = this.prefix + '_blog_visitor';
  return this.client.get(key);
};

Vistor.prototype.incrementBlogVisitor = function() {
  var key = this.prefix + '_visitor';
  var self = this;
  return self.client.get(key).then(function(result) {
    var count;
    if (isNaN(parseInt(result))) {
      count = 0;
    } else {
      count = parseInt(result);
    }
    return self.client.set(key, count + 1);
  });
};


module.exports = Vistor;

var util = require('util');
var Base = require('../base_controller');

function BlogWrite() {
  Base.call(this);
  this.name = 'BlogWrite';
}

util.inherits(BlogWrite, Base);

BlogWrite.prototype.run = function(req, res, next) {
  BlogWrite.super_.prototype.run.call(this, req, res);
  res.status(200).render('blog/blogEditor.html', {
    host: req.headers.host,
    type: 'write',
    article: null
  });
};

module.exports = BlogWrite;
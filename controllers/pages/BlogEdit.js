var util = require('util');
var Base = require('../BaseController');

function BlogEdit() {
  Base.call(this);
}

util.inherits(BlogEdit, Base);

BlogEdit.prototype.run = function(req, res, next) {
  BlogEdit.super_.prototype.run.call(this, req, res);
  res.status(200).render('blog/blogEditor.html', {
    host: req.headers.host,
    type: 'edit',
    cid: req.params.cid
  });
};

module.exports = BlogEdit;

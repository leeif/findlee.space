var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function BlogUpdate() {
  Base.call(this);
}

util.inherits(BlogUpdate, Base);

BlogUpdate.prototype.run = function(req, res, next) {
  BlogUpdate.super_.prototype.run.call(this, req, res);
  try {
    Manager.Put(req.db).updateArticle(req.body, function(err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }catch(err){
    res.status(500).json(err);
  }
};

module.exports = BlogUpdate;

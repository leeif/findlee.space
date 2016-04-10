var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/PutManager');

function BlogUpdate() {
  Base.call(this);
}

util.inherits(BlogUpdate, Base);

BlogUpdate.prototype.run = function(req, res, next) {
  var manager = Manager.getInstance(req.db, req.redis);
  BlogUpdate.super_.prototype.run.call(this, req, res);
  manager.articleUpdate(req.body, function(err, response) {
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(response);
    }
  });
};

module.exports = BlogUpdate;
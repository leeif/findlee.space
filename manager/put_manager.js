var Base = require('./base_manager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function PutManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(PutManager, Base);

PutManager.prototype.updateArticle = function(article, callback) {
  var self = this;
  if (!article.cid ||
    !article.title ||
    !article.author ||
    !article.text ||  
    !article.modified) {
    return callback({
      status: 500,
      err: 'bad request'
    });
  }
  co(function*() {
    try {
      var user = yield self.db.users.queryOrInsert({
        where: {
          screenName: article.author,
        },
        defaults: {
          name: article.author,
          screenName: article.author,
        }
      });
      yield self.db.contents.update({
        title: article.title,
        text: article.text,
        modified: article.modified,
        authorId: user[0].get('uid'),
        type: article.type || null,
        discription: article.discription || null
      },{
        where: [{
          cid: article.cid
        }]
      });
    } catch (err) {
      throw err;
    }
    return {
      redirect: '/blog/article/' + article.cid
    };
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
    console.log(err);
    onError(err);
  });

  function onError(err) {
    callback({
      status: 500,
      error: err.msg,
    });
  }

  function onSuccess(result) {
    callback(null, {
      status: 200,
      redirect: result.redirect
    });
  }
};

module.exports = function() {
  return function(db, redis) {
    managerInstance = new PutManager(db, redis);
    return managerInstance;
  };
};

var Base = require('./BaseManager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function PutManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(PutManager, Base);

PutManager.prototype.articleUpdate = function(article, callback) {
  var authorId;
  var queryUser;
  var insertUser;
  var updateArticle;
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
      //query user
      queryUser = yield self.dBExecute({
        actionType: 'query',
        sql: 'select * from users where screenName = ' +
          self.sqlEscape(article.author)
      });

      if (queryUser.length > 0) {
        authorId = queryUser[0].uid;
      } else {
        //insert author(user table)
        insertUser = yield self.dBExecute({
          actionType: 'insert',
          sql: 'insert into users(screenName) values (' +
            self.sqlEscape(article.author) +
            ')'
        });
        authorId = insertUser.insertId;
      }

      //update blog(content table)
      updateArticle = yield self.dBExecute({
        actionType: 'update',
        sql: 'update contents set title = ' + self.sqlEscape(article.title) + ',' +
          'authorId = ' + authorId + ',' +
          'text = ' + self.sqlEscape(article.text) + ',' +
          'modified = ' + article.modified + ' ' +
          'where cid = ' + article.cid
      });

    } catch (err) {
      throw err;
    }
    return updateArticle;
  }).then(function(result) {
    console.log(result);
    onSuccess(result);
  }, function(err) {
    console.log(err);
    onError(err);
  });

  function onError() {
    callback({
      status: 500,
      error: 'server error',
    });
  }

  function onSuccess() {
    callback(null, {
      status: 200,
      redirectURL: '/blog/article/' + article.cid
    });
  }
};

module.exports = function() {
  return function(db, redis) {
    if (managerInstance === null) {
      managerInstance = new PutManager(db, redis);
    }
    return managerInstance;
  };
};

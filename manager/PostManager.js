var Base = require('./BaseManager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function PostManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(PostManager, Base);


PostManager.prototype.addTag = function(tag, callback) {
  var self = this;
  var sqlData = {};
  sqlData.where = [{
    'name': tag.name
  }];
  sqlData.defaults = {
    'name': tag.name,
    'count': 0
  };
  co(function*() {
    var result = yield self.db.metas.queryOrInsert(sqlData);
    if (result[1]) {
      return {
        mid: result[0].get('mid'),
        name: result[0].get('name')
      };
    } else {
      throw new Error('Tag Already Exists');
    }
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
      mid: result.mid,
      name: result.name,
    });
  }
};

PostManager.prototype.publishArticle = function(article, callback) {
  var self = this;
  var content;
  co(function*() {
    try {
      var user = yield self.db.users.queryOrInsert({
        where: {
          screenName: article.author,
        },
        default: {
          name: article.author,
          screenName: article.author,
        }
      });
      content = yield self.db.contents.insert({
        title: article.title,
        text: article.text,
        created: article.created,
        modified: article.modified,
        authorId: user[0].get('uid'),
        type: article.type || null,
        discription: article.discription || null
      });
      article.relationships.forEach(function(item) {
        item.cid = content.get('cid');
      });
      yield self.db.relationships.bulkInsert(article.relationships);
    } catch (err) {
      throw err;
    }
    return {
      redirect: '/blog/article/' + content.get('cid')
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

PostManager.prototype.login = function(user, callback) {
  var self = this;
  var redirect = user.redirect || '/blog';
  var sqlData = {};
  if (user.account.indexOf('@') != -1) {
    sqlData.where = {
      mail: user.account,
    };
  } else {
    sqlData.where = {
      name: user.account,
    };
  }
  co(function*() {
    try {
      var user = yield self.db.users.query(sqlData);
      if (user[0].get('password') == user.password) {
        return {
          uid: user[0].get('uid'),
          type: user[0].get('type') || 'normal',
          redirect: redirect
        };
      } else {
        throw 'Login Failed';
      }
    } catch (err) {
      throw {
        err: err
      };
    }
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
      uid: result.uid,
      type: result.type,
      redirect: result.redirect
    });
  }
};

module.exports = function() {
  return function(db, redis) {
    if (managerInstance === null) {
      managerInstance = new PostManager(db, redis);
    }
    return managerInstance;
  };
};

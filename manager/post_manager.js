var Base = require('./base_manager');
var util = require('util');
var co = require('co');
var fs = require('fs');
var mime = require('mime-types');
var path = require('path');
var utils = require('../tool/utils');

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
      tag: result
    });
  }
};

PostManager.prototype.addRelationship = function(relationship, callback) {
  var self = this;
  var sqlData = {};
  sqlData.where = {
    cid: relationship.cid,
    mid: relationship.mid
  };
  sqlData.defaults = {
    cid: relationship.cid,
    mid: relationship.mid
  };
  co(function*() {
    try {
      var relationship = yield self.db.relationships.queryOrInsert(sqlData);
      if (relationship[1]) {
        return {
          cid: relationship[0].get('mid'),
          mid: relationship[0].get('cid')
        };
      } else {
        throw new Error('Relationship Already Exits');
      }
    } catch (err) {
      throw err;
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
      err: err.msg,
    });
  }

  function onSuccess(result) {
    callback(null, {
      status: 200,
      relationship: result
    });
  }
};

PostManager.prototype.uploadImage = function(busboy, callback) {
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    if(mime.lookup('jpg') !== mimetype && mime.lookup('png') !== mimetype) {
      onError(new Error('Only Receive Image File'));
    }
    var dirpath = path.join(__dirname, '../public/blog/image/article');
    fs.stat(dirpath, function(err, stats) {
      if (err || !stats.isDirectory()) {
        fs.mkdirSync(dirpath);
      }
      filename = Date.now() + '.' + mime.extension(mimetype);
      var filepath = path.join(dirpath, filename);
      file.pipe(fs.createWriteStream(filepath));
      file.on('end', function() {
        onSuccess(filename);
      });
    });

    function onError(err) {
      callback({
        error: err
      });
    }

    function onSuccess(result) {
      callback(null, {
        filename: filename
      });
    }
  });
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
        defaults: {
          name: article.author,
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

PostManager.prototype.addComment = function(comment, callback){
  var self = this;
  co(function*() {
    try {
      yield self.db.comments.insert({
        cid: comment.cid,
        author: comment.author,
        text: comment.text,
        created: Date.now()/1000
      });
      return;
    } catch (err) {
      throw err;
    }
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
    console.log(err);
    onError(err);
  });
  function onError(err) {
    callback({
      error: err
    });
  }
  
  function onSuccess(result) {
    callback(null, {
    });
  }
};

PostManager.prototype.login = function(user, callback) {
  var self = this;
  var redirect = user.redirect || '/blog/admin';
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
      if (user.length !== 0 && user[0].get('password`') === user.password) {
        return {
          uid: user[0].get('uid'),
          screenName: user[0].get('screenName'),
          type: user[0].get('type') || 'normal',
          redirect: redirect
        };
      } else {
        throw new Error('Login Failed');
      }
    } catch (err) {
      throw err;
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
      err: err.msg,
    });
  }

  function onSuccess(result) {
    callback(null, {
      status: 200,
      uid: result.uid,
      screenName: result.screenName,
      type: result.type,
      redirect: result.redirect
    });
  }
};



module.exports = function() {
  return function(db, redis) {
    managerInstance = new PostManager(db, redis);
    return managerInstance;
  };
};

var Base = require('./BaseManager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function PostManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(PostManager, Base);


PostManager.prototype.addTag = function(tag, callback) {
  var sqlData = {
    actionType: 'insert',
    sql: 'insert into metas(name, count) select ' +
      this.sqlEscape(tag.name) +
      ',0 from dual where not exists (select * from metas where name = ' +
      this.sqlEscape(tag.name) +
      ');'
  };
  // var dBExecute = gctwUtils.promisify(this.dBHelper, this.dBHelper.execute);
  this.dBExecute(sqlData).then(function(result) {
    if (result.insertId === 0) {
      callback({
        errMSG: 'duplicated'
      });
    } else {
      callback(null, result);
    }
  }, function(err) {
    callback({
      errMSG: err
    });
  });
};

PostManager.prototype.addRelationship = function(relationship, callback) {
  var queryResult;
  var insertResult;
  var self = this;
  co(function*() {
    queryResult = yield self.dBExecute({
      actionType: 'query',
      sql: 'select * from relationships where cid = ' + relationship.cid +
        ' and ' +
        'mid = ' + relationship.mid,
    });
    if (queryResult.length > 0) {
      throw new Error('relationship exist');
    } else {
      insertResult = yield self.dBExecute({
        actionType: 'insert',
        sql: 'insert into relationships values (' + relationship.cid + ',' +
          relationship.mid +
          ')'
      });
    }
  }).then(function(result) {
    callback(null, {
      status: 200,
    });
  }, function(err) {
    console.log(err);
    callback({
      status: 500
    });
  });
};

PostManager.prototype.articleUpdate = function(article, callback) {
  var authorId;
  var queryUser;
  var insertUser;
  var updateArticle;

  if (!article.title || !article.author || !article.text) {
    return callback({
      status: 500,
      err: new Error('bad request')
    });
  }
  co(function*() {
    try {
      //query user
      queryUser = yield this.dBExecute({
        actionType: 'query',
        sql: 'select * from users where screenName = ' + article.author
      });

      if (queryUser.length > 0) {
        authorId = queryUser[0].uid;
      } else {
        //insert author(user table)
        insertUser = yield this.dBExecute({
          actionType: 'insert',
          sql: 'insert into users(screenName) values (' + article.name + ')'
        });
        authorId = insertUser.insertId;
      }

      //update blog(content table)
      updateArticle = yield this.dBExecute({
        actionType: 'update',
        sql: 'update content set title = ' + article.title + ',' +
          'authorId = ' + authorId + ',' +
          'text = ' + article.text + ' ' +
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
    onError(err);
  });

  function onError() {
    callback({
      status: 500,
      error: new Error('server error'),
    });
  }

  function onSuccess() {
    callback(null, {
      status: 200,
    });
  }
};

PostManager.prototype.publish = function(article, callback) {
  var sqlData = {
    table: 'contents',
    actionType: 'insert',
    insertColumns: ['title', 'discription', 'created', 'modified', 'text'],
    insertData: [
      article.title,
      article.discription,
      article.created,
      article.modified,
      article.text
    ]
  };
  this.dBExecute(sqlData).then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  });
};

exports.getInstance = function(db, redis) {
  if (managerInstance === null) {
    managerInstance = new PostManager(db, redis);
  }
  return managerInstance;
};

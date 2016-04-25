var Base = require('./BaseManager');
var util = require('util');
var models = require('../models');
var co = require('co');
var managerInstance = null;
var formater = require('dateformater');
var marked = require('../tool/MarkdownConverter');

function GetManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(GetManager, Base);

GetManager.prototype.getArticle = function(cid, callback) {
  var self = this;
  var sqlData = {};
  sqlData.where = [{
    'cid': cid
  }];
  sqlData.include = [{
    model: models.relationships,
    include: [{
      model: models.metas,
      require: true
    }]
  }, {
    model: models.users,
  }];
  co(function*() {
    var article;
    var contents;
    try {
      contents = yield self.db.contents.query(sqlData);
      article = formatArticle(contents[0], false);
    } catch (err) {
      throw err;
    }
    return article;
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
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
      article: result
    });
  }
};

function formatArticle(data, isList) {
  var article = {};
  article.cid = data.get('cid');
  article.title = data.get('title');
  if (!isList) {
    article.markdown = data.get('text');
    if (article.markdown) {
      article.html = marked(article.markdown);
    }
  }
  article.created = {
    origin: data.get('created'),
    formated: formater.format(data.get('created'), 'YYYY/MM/DD')
  };
  article.modified = {
    origin: data.get('modified'),
    formated: formater.format(data.get('modified'), 'YYYY/MM/DD')
  };
  article.metas = [];
  data.get('relationships').forEach(function(item) {
    var meta = item.get('meta');
    if (!meta) {
      return;
    }
    article.metas.push({
      mid: meta.get('mid'),
      name: meta.get('name')
    });
  });
  article.user = {
    uid: data.get('user').get('uid'),
    screenName: data.get('user').get('screenName')
  };
  return article;
}

//Get all articles only contain title, tags and modified date;
GetManager.prototype.getArticles = function(callback) {
  var self = this;
  var sqlData = {};
  var articles = [];
  sqlData.attributes = [
    'cid',
    'title',
    'created',
    'modified',
  ];
  sqlData.include = [{
    model: models.relationships,
    include: [{
      model: models.metas,
      require: true
    }]
  }, {
    model: models.users
  }];
  co(function*() {
    var contents;
    try {
      contents = yield self.db.contents.query(sqlData);
      contents.forEach(function(item){
        articles.push(formatArticle(item, true));
      });
    } catch (err) {
      throw err;
    }
    return articles;
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
    onError(err);
  });

  function onError(err) {
    console.log(err);
    callback({
      status: 500,
      error: err.msg,
    });
  }

  function onSuccess(result) {
    callback(null, {
      status: 200,
      articles: result
    });
  }
};

GetManager.prototype.getTags = function(mid, callback) {
  var self = this;
  var sqlData = {};
  if(mid){
    sqlData.where = [{
      'mid': mid
    }];
  }
  sqlData.attributes = ['mid', 'name'];
  sqlData.order = ['count'];
  var tags=[];
  co(function*(){
    try{
      var metas = yield self.db.metas.query(sqlData);
      metas.forEach(function(item){
        tags.push(item.get());
      });
      return tags;
    }catch(err){
      throw err;
    }
  }).then(function(result){
    onSuccess(result);
  },function(err){
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
      tags: result
    });
  }
};

module.exports = function() {
  return function(db, redis) {
    if (managerInstance === null) {
      managerInstance = new GetManager(db, redis);
    }
    return managerInstance;
  };
};

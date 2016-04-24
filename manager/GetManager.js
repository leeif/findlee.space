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
      contents = yield self.db.contents.get(sqlData);
      article = formatArticle(contents[0], false);
    } catch (err) {
      throw err;
    }
    return article;
  }).then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  });
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
GetManager.prototype.getArticleList = function(callback) {
  var self = this;
  var sqlData = {};
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
    var articles = [];
    var contents;
    try {
      contents = yield self.db.contents.get(sqlData);
      contents.forEach(function(item){
        articles.push(formatArticle(item, true));
      });
    } catch (err) {
      throw err;
    }
    return articles;
  }).then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  });
};

GetManager.prototype.getTag = function(mid, callback) {
  var sqlData = {
    table: 'metas',
    actionType: 'query',
    resultColumns: ['mid', 'name'],
    queryColumns: mid ? ['mid'] : null,
    queryData: mid ? [mid] : null,
  };
  this.dBExecute(sqlData).then(function(result) {
    callback(null, mid ? result[0] : result);
  }, function(err) {
    callback(err);
  });
};

module.exports = function() {
  return function(db, redis) {
    if (managerInstance === null) {
      managerInstance = new GetManager(db, redis);
    }
    return managerInstance;
  };
};

var Base = require('./BaseManager');
var util = require('util');
var formater = require('dateformater');
var managerInstance = null;
var gctwUtils = require('../tool/GCTWUtils');
var marked = require('../tool/MarkdownConverter');

function BlogManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(BlogManager, Base);

BlogManager.prototype.getBlogList = function(callback) {
  var sqlData = {
    table: 'contents',
    actionType: 'query',
    resultColumns: [
      'contents.cid',
      'contents.title',
      'contents.created',
      "group_concat(metas.name separator ',') as metas"
    ],
    join: ' left join relationships on relationships.cid = contents.cid ' +
      'left join metas on relationships.mid = metas.mid ' +
      'group by contents.cid'
  };
  var dBExecute = gctwUtils.promisify(this.dBHelper, this.dBHelper.execute);
  var date = new Date();
  dBExecute(sqlData).then(function(blogList) {
    blogList.forEach(function(blog) {
      date.setTime(blog.created * 1000);
      blog.formateCreated = formater.format(date,
        'YYYY/MM/DD');
      if (blog.metas === null) {
        blog.metas = [];
      } else {
        blog.metas = blog.metas.split(',');
      }
    });
    callback(null, blogList);
  }, function(err) {
    callback(err);
  });
};

BlogManager.prototype.getBlog = function(cid, callback) {
  var blog = null;
  var sqlData = {
    table: 'contents',
    actionType: 'query',
    resultColumns: [
      'contents.*',
      "group_concat(metas.name separator ',') as metas",
      'users.uid',
      'users.screenName as uname'
    ],
    queryColumns: ['contents.cid'],
    queryData: [cid],
    join: ' left join users on users.uid = contents.authorId ' +
      'left join relationships on relationships.cid = contents.cid ' +
      'left join metas on relationships.mid = metas.mid ',
    group: ' group by contents.cid'
  };
  var date = new Date();
  var dBExecute = gctwUtils.promisify(this.dBHelper, this.dBHelper.execute);
  dBExecute(sqlData).then(function(result) {
    blog = result[0];
    date.setTime(blog.created);
    blog.formateCreated = formater.format(date,
      'YYYY.MM.DD');
    date.setTime(blog.modified);
    blog.formateModified = formater.format(date,
      'YYYY.MM.DD');
    if (blog.metas === null) {
      blog.metas = [];
    } else {
      blog.metas = blog.metas.split(',');
    }
    blog.formatMark = marked(blog.text);
    callback(null, blog);
  }, function(err) {
    callback(err);
  });
};

BlogManager.prototype.publish = function(body, callback) {
  var sqlData = {
    table: 'contents',
    actionType: 'insert',
    insertColumns: ['title', 'discription', 'created', 'modified', 'text'],
    insertData: [
      body.title,
      body.discription,
      body.created,
      body.modified,
      body.text
    ]
  };
  var dBExecute = gctwUtils.promisify(this.dBHelper, this.dBHelper.execute);
  dBExecute(sqlData).then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  });
};

exports.getInstance = function(db, redis) {
  if (managerInstance === null) {
    managerInstance = new BlogManager(db, redis);
  }
  return managerInstance;
};

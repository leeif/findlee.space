var Base = require('./BaseManager');
var util = require('util');
var formater = require('dateformater');
var managerInstance = null;
var marked = require('../tool/MarkdownConverter');

function GetManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(GetManager, Base);

GetManager.prototype.getArticle = function(cid, callback) {
  var sqlData = {
    table: 'contents',
    actionType: 'query',
    resultColumns: cid ? [
      'contents.*',
      "group_concat(metas.name separator ',') as mname",
      "group_concat(metas.mid separator ',') as mid",
      'users.screenName as author'
    ] : [
      'contents.cid',
      'contents.title',
      'contents.created',
      "group_concat(metas.name separator ',') as mname",
      "group_concat(metas.mid separator ',') as mid"
    ],
    queryColumns: cid ? ['contents.cid'] : null,
    queryData: cid ? [cid] : null,
    join: cid ? ' left join relationships on relationships.cid = contents.cid ' +
      'left join metas on relationships.mid = metas.mid ' +
      'left join users on users.uid = contents.authorId ' : ' left join relationships on relationships.cid = contents.cid ' +
      'left join metas on relationships.mid = metas.mid ',
    group: 'group by contents.cid'
  };
  var date = new Date();
  this.dBExecute(sqlData).then(function(blogList) {
    blogList.forEach(function(blog) {
      date.setTime(blog.created * 1000);
      blog.formateCreated = formater.format(date,
        'YYYY/MM/DD');
      if (blog.mid) {
        blog.metas = integrateMetas(blog.mid.split(','),
          blog.mname.split(','));
      } else {
        blog.metas = [];
      }
      blog.formatMark = cid ? marked(blog.text) : null;
    });
    callback(null, cid ? blogList[0] : blogList);
  }, function(err) {
    callback(err);
  });
};

function integrateMetas(mid, mname) {
  var metas = [];
  var i;
  for (i = 0; i < mid.length; i++) {
    (function(i) {
      metas.push({
        mid: mid[i],
        name: mname[i]
      });
    })(i);
  }
  return metas;
}

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

exports.getInstance = function(db, redis) {
  if (managerInstance === null) {
    managerInstance = new GetManager(db, redis);
  }
  return managerInstance;
};

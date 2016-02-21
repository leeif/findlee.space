var DBHelper = require('../module/DBHelper');
var config = require('../config/Config');
var mysql = require('mysql');

var db = mysql.createPool({
  host : config.db.host,
  user : config.db.user,
  password : config.db.password,
  database : config.db.database,
  debug : config.db.debug
});

var dBHelper = new DBHelper(db);
dBHelper.getConnection(function(connection){
	var sql = {
	    table: 'contents',
	    actionType: 'query',
	    resultColumns: [
	      'contents.*',
	      "group_concat(metas.name separator ',') as metas",
	      'users.uid',
	      'users.screenName as uname'
	    ],
	    queryColumns: ['contents.cid'],
	    queryData: [1],
	    join: ' left join users on users.uid = contents.authorId ' + 
	      'left join relationships on relationships.cid = contents.cid ' +
	      'left join metas on relationships.mid = metas.mid ',
	    group: ' group by contents.cid'
	};
	dBHelper.execute(sql, function(err, result){
		console.log(err);
		console.log(result);
	}, connection);
});

var mysql = require('mysql');
var chalk = require('chalk');
var db = require('../config/Config').db;
var proxy = new require('eventproxy')();

//creare content table
var contents = 'create table if not exists contents( ' +
  'cid int(10) unsigned not null auto_increment, ' +
  'title varchar(200) not null, ' +
  'discription varchar(512), ' +
  'created int(10) unsigned not null, ' +
  'modified int(10) unsigned not null, ' +
  'text text, ' +
  'authorId int(10) unsigned, ' +
  'type varchar(16), ' +
  'PRIMARY KEY(cid) ' +
  ')';

//create relationships table
var relationships = 'create table if not exists relationships( ' +
  'cid int(10) unsigned not null, ' +
  'mid int(10) unsigned not null ' +
  ')';

//create metas table
var metas = 'create table if not exists metas( ' +
  'mid int(10) unsigned not null, ' +
  'name varchar(200), ' +
  'type varchar(32), ' +
  'description varchar(200), ' +
  'count int(10) unsigned not null, ' +
  'PRIMARY KEY(mid) ' +
  ')';

//create comments table
var comments = 'create table if not exists comments( ' +
  'coid int(10) unsigned auto_increment, ' +
  'cid int(10) unsigned, ' +
  'created int(10) unsigned, ' +
  'author int(10), ' +
  'authorId int(10), ' +
  'ownerId int(10), ' +
  'ip varchar(64), ' +
  'text text, ' +
  'type varchar(16), ' +
  'parent int(10), ' +
  'PRIMARY KEY(coid) ' +
  ')';

//create users table;
var users = 'create table if not exists users( ' +
  'uid int(10) unsigned not null auto_increment, ' +
  'name varchar(32) unique, ' +
  'password varchar(32), ' +
  'mail varchar(200), ' +
  'url varchar(200), ' +
  'screenName varchar(32), ' +
  'created int(10) unsigned not null, ' +
  'activated int(10) unsigned not null, ' +
  'logged int(10) unsigned not null, ' +
  'type varchar(16) not null, ' +
  'PRIMARY KEY(uid)' +
  ')';

var connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  debug: db.debug
});

//create tables
(function(connection) {
  var i;
  var tables = {
    contents: contents,
    relationships: relationships,
    metas: metas,
    comments: comments,
    users: users
  };

  proxy.all('contents', 'relationships', 'metas', 'comments', 'users',
    function() {
      console.log(chalk.black.bgYellow(
        'All Tables are created successfully'));
        process.exit(0);
    });
  proxy.bind('error', function(err) {
    proxy.unbind();
    console.error(err);
    process.exit(1);
  });

  function createTable(table) {
    connection.query(tables[table], function(err) {
      if (err) {
        console.error(chalk.red(table + ' table create failed'));
        proxy.emit('error', err);
      } else {
        console.log(chalk.green(table + ' table create success'));
        proxy.emit(table);
      }
    });
  }

  for (i in tables) {
    createTable(i);
  }

})(connection);

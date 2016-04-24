'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    coid : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      allowNull : false,
      autoIncrement : true,
      primaryKey : true,
      field : 'coid',
    },
    cid : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      allowNull : false,
      field : 'cid',
    },
    created : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      field : 'created',
    },
    author : {
      type : DataTypes.STRING(200),
      field : 'author',
    },
    authorId : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      field : 'authorId',
    },
    ownerId : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      field : 'ownerId',
    },
    ip : {
      type : DataTypes.INTEGER(64),
      field : 'ip'
    },
    text : {
      type : DataTypes.TEXT,
      field : 'text',
    },
    type : {
      type : DataTypes.STRING(16),
      field : 'type',
    },
    status : {
      type : DataTypes.STRING(16),
      field : 'status',
    },
    parent : {
      type : DataTypes.INTEGER(10).UNSIGNED,
      field : 'parent',
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  }, {
    
  });
  return comments;
};
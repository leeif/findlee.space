'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'uid',
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      field: 'name',
    },
    password: {
      type: DataTypes.STRING(32),
      field: 'password'
    },
    mail: {
      type: DataTypes.STRING(200),
      field: 'mail',
    },
    url: {
      type: DataTypes.STRING(200),
      field: 'url',
    },
    screenName: {
      type: DataTypes.STRING(32),
      field: 'screenName',
    },
    created: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'created',
    },
    activated: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'activated',
    },
    logged: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'logged',
    },
    type: {
      type: DataTypes.STRING(16),
      field: 'type',
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};

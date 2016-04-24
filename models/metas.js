'use strict';
module.exports = function(sequelize, DataTypes) {
  var metas = sequelize.define('metas', {
    mid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'mid'
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'name'
    },
    type: {
      type: DataTypes.STRING(32),
      field: 'type'
    },
    description: {
      type: DataTypes.STRING(200),
      field: 'description'
    },
    count: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'count',
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  }, {
    
  });
  return metas;
};

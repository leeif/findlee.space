'use strict';
module.exports = function(sequelize, DataTypes) {
  var relationships = sequelize.define('relationships', {
    cid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'cid',
    },
    mid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'mid',
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.contents.hasMany(models.relationships, {
          foreignKey: 'cid',
        });
        models.relationships.belongsTo(models.metas, {
          foreignKey: 'mid',
        });

        models.metas.hasMany(models.relationships, {
          foreignKey: 'mid'
        });
        models.relationships.belongsTo(models.contents, {
          foreignKey: 'cid'
        });
      }
    }
  }, {});
  return relationships;
};

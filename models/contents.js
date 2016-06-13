'use strict';
module.exports = function(sequelize, DataTypes) {
  var contents = sequelize.define('contents', {
    cid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'cid',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'title'
    },
    discription: {
      type: DataTypes.STRING(512),
      field: 'discription'
    },
    text: {
      type: DataTypes.TEXT,
      field: 'text',
    },
    created: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'created',
    },
    modified: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      field: 'modified',
    },
    authorId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      field: 'authorId',
    },
    type: {
      type: DataTypes.STRING(16),
      field: 'type'
    },
    visitor: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "visitor"
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.contents.belongsTo(models.users, {
          foreignKey: 'authorId'
        });
      }
    }
  }, {

  });
  return contents;
};

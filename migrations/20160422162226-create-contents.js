'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('contents', {
      cid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'cid',
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: 'title'
      },
      discription: {
        type: Sequelize.STRING(512),
        field: 'discription'
      },
      text: {
        type: Sequelize.TEXT,
        field: 'text',
      },
      created: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'created',
      },
      modified: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'modified',
      },
      authorId: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'authorId',
      },
      type: {
        type: Sequelize.STRING(16),
        field: 'type'
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('contents');
  }
};

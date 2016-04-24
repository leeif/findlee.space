'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      coid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'coid',
      },
      cid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'cid',
      },
      created: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'created',
      },
      author: {
        type: Sequelize.STRING(200),
        field: 'author',
      },
      authorId: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'authorId',
      },
      ownerId: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'ownerId',
      },
      ip: {
        type: Sequelize.INTEGER(64),
        field: 'ip'
      },
      text: {
        type: Sequelize.TEXT,
        field: 'text',
      },
      type: {
        type: Sequelize.STRING(16),
        field: 'type',
      },
      status: {
        type: Sequelize.STRING(16),
        field: 'status',
      },
      parent: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'parent',
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};

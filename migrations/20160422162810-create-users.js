'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      uid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'uid',
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
        field: 'name',
      },
      password: {
        type: Sequelize.STRING(32),
        field: 'password'
      },
      mail: {
        type: Sequelize.STRING(200),
        field: 'mail',
      },
      url: {
        type: Sequelize.STRING(200),
        field: 'url',
      },
      screenName: {
        type: Sequelize.STRING(32),
        field: 'screenName',
      },
      created: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'created',
      },
      activated: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'activated',
      },
      logged: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        field: 'logged',
      },
      type: {
        type: Sequelize.STRING(16),
        field: 'type',
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};

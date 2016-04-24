'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('relationships', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      cid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'cid',
      },
      mid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'mid',
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('relationships');
  }
};

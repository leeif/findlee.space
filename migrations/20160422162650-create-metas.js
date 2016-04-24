'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('metas', {
      mid: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'mid'
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: 'name'
      },
      type: {
        type: Sequelize.STRING(32),
        field: 'type'
      },
      description: {
        type: Sequelize.STRING(200),
        field: 'description'
      },
      count: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        field: 'count',
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('metas');
  }
};

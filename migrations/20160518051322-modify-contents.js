'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'contents', 
      'visitor',
      {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('contents', 'visitor');
  }
};

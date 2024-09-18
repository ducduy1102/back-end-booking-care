module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn("Users", "birthday", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return queryInterface.removeColumn("Users", "birthday");
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

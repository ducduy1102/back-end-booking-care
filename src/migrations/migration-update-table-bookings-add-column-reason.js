module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn("Bookings", "reason", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return queryInterface.removeColumn("Bookings", "reason");
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

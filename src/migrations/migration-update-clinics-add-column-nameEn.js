module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn("Clinics", "nameEn", {
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
      return queryInterface.removeColumn("Clinics", "nameEn");
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

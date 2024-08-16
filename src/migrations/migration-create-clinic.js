"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Clinics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      descIntroduction: {
        type: Sequelize.TEXT,
      },
      descIntroductionHTML: {
        type: Sequelize.TEXT,
      },
      descProfessionalStrengths: {
        type: Sequelize.TEXT,
      },
      descProfessionalStrengthsHTML: {
        type: Sequelize.TEXT,
      },
      descEquipment: {
        type: Sequelize.TEXT,
      },
      descEquipmentHTML: {
        type: Sequelize.TEXT,
      },
      descLocation: {
        type: Sequelize.TEXT,
      },
      descLocationHTML: {
        type: Sequelize.TEXT,
      },
      descProcess: {
        type: Sequelize.TEXT,
      },
      descProcessHTML: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clinics");
  },
};

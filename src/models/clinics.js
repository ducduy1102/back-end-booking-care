"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clinics.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,
      descIntroductionHTML: DataTypes.TEXT,
      descIntroduction: DataTypes.TEXT,
      descProfessionalStrengthsHTML: DataTypes.TEXT,
      descProfessionalStrengths: DataTypes.TEXT,
      descEquipmentHTML: DataTypes.TEXT,
      descEquipment: DataTypes.TEXT,
      descLocationHTML: DataTypes.TEXT,
      descLocation: DataTypes.TEXT,
      descProcessHTML: DataTypes.TEXT,
      descProcess: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Clinics",
    }
  );
  return Clinics;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialties.hasMany(models.Doctor_Infor, {
        foreignKey: "id",
        as: "speciatyData",
      });
    }
  }
  Specialties.init(
    {
      name: DataTypes.TEXT,
      nameEn: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Specialties",
    }
  );
  return Specialties;
};

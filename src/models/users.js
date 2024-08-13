"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.AllCodes, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      Users.belongsTo(models.AllCodes, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      Users.hasOne(models.Markdowns, { foreignKey: "doctorId" });
      Users.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
      Users.hasMany(models.Schedules, {
        foreignKey: "doctorId",
        as: "doctorData",
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

"use strict";
import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          if (value.length >= 1 && value.length <= 20) {
            this.setDataValue("password", bcrypt.hashSync(value, 10));
          } else {
            throw new Error("Your password should be between 1-20 characters!");
          }
        },
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone_number",
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "profile_image",
      },
      userDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "user_desc",
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    }
  );

  user.prototype.isValidPassword = async function (pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  user.associate = function (models) {
    user.hasMany(models.item, {
      foreignKey: "userId",
      as: "item",
    });
  };
  return user;
};

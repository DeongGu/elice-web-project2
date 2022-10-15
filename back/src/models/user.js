"use strict";
import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
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

  user.beforeSave(async (user) => {
    try {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  user.prototype.isValidPassword = async function (pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  user.associate = function (models) {
    user.hasMany(models.address, {
      foreignKey: "user_id",
      as: "address",
    });
    user.hasMany(models.item, {
      foreignKey: "user_id",
      as: "item",
    });
    user.hasMany(models.user_image, {
      foreignKey: "user_id",
      as: "user_image",
    });
  };
  return user;
};

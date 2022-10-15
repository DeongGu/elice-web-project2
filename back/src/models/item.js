"use strict";
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define(
    "item",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item_desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("inStock", "onTrading", "outOfStock"),
        defaultValue: "inStock",
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
  item.associate = function (models) {
    // associations can be defined here
    item.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    item.hasMany(models.order, {
      foreignKey: "item_id",
      as: "order",
    });
    item.hasMany(models.code_type, {
      foreignKey: "item_id",
      as: "code_type",
    });
    item.hasMany(models.code_info, {
      foreignKey: "item_id",
      as: "code_info",
    });
    item.hasMany(models.item_image, {
      foreignKey: "item_id",
      as: "item_image",
    });
  };
  return item;
};

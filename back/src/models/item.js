"use strict";
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define(
    "item",
    {
      itemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "item_name",
      },
      itemCategory: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "item_category",
      },
      itemType: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "item_type",
      },
      itemImage: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "item_image",
      },
      itemDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "item_desc",
      },
      status: {
        type: DataTypes.ENUM("inStock", "onTrading", "outOfStock"),
        defaultValue: "inStock",
      },
      openChat: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "open_chat",
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
    item.hasMany(models.dibs, {
      foreignKey: "itemId",
      as: "dibs",
    });
    item.belongsTo(models.user, {
      foreignKey: "userId",
    });
  };
  return item;
};

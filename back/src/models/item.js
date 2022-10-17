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
    item.belongsTo(models.user, {
      foreignKey: "userId",
    });
    item.hasMany(models.order, {
      foreignKey: "itemId",
      as: "order",
    });
  };
  return item;
};

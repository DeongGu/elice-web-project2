"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "item_id",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
      message: {
        type: DataTypes.STRING(1000),
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
  order.associate = function (models) {
    order.belongsTo(models.user, {
      foreignKey: "userId",
    });
    order.belongsTo(models.item, {
      foreignKey: "itemId",
    });
  };
  return order;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    // associations can be defined here
    order.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    order.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return order;
};

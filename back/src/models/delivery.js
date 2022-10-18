"use strict";
module.exports = (sequelize, DataTypes) => {
  const delivery = sequelize.define(
    "delivery",
    {
      deliveryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      status: {
        type: DataTypes.ENUM("yet_unknown", "known", "on_preparing", "sended"),
        defaultValue: "yet_unknown",
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "delivery_number",
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
  delivery.associate = function (models) {
    delivery.belongsTo(models.order, {
      foreignKey: "orderId",
    });
  };
  return delivery;
};

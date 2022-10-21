"use strict";
module.exports = (sequelize, DataTypes) => {
  const dibs = sequelize.define(
    "dibs",
    {
      dibsId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
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
  dibs.associate = function (models) {
    dibs.belongsTo(models.user, {
      foreignKey: "userId",
    });
    dibs.belongsTo(models.item, {
      foreignKey: "itemId",
    });
  };
  return dibs;
};

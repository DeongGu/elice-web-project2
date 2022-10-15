"use strict";
module.exports = (sequelize, DataTypes) => {
  const dibs = sequelize.define(
    "dibs",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
    // associations can be defined here
    dibs.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    dibs.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return dibs;
};

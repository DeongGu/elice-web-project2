"use strict";
module.exports = (sequelize, DataTypes) => {
  const item_tag = sequelize.define(
    "item_tag",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      item_id: {
        type: DataTypes.UUID,
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
  item_tag.associate = function (models) {
    // associations can be defined here
    item_tag.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return item_tag;
};

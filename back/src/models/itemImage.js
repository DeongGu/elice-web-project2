"use strict";
module.exports = (sequelize, DataTypes) => {
  const item_image = sequelize.define(
    "item_image",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "image_url",
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
  item_image.associate = function (models) {
    // associations can be defined here
    item_image.belongsTo(models.item, {
      item_image: "item_id",
    });
  };
  return item_image;
};

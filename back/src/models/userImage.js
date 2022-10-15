"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_image = sequelize.define(
    "user_image",
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
        field: "user_image_url",
      },
      user_id: {
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
  user_image.associate = function (models) {
    // associations can be defined here
    user_image.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };

  return user_image;
};

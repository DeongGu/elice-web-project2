"use strict";
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      reviewStar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "review_star",
      },
      reviewDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "review_desc",
      },
      item_id: {
        type: DataTypes.UUID,
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
  review.associate = function (models) {
    // associations can be defined here
    review.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    review.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return review;
};

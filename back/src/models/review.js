"use strict";
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    "review",
    {
      reviewId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: "id",
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
      itemId: {
        type: DataTypes.UUID,
      },
      userId: {
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
    review.belongsTo(models.user, {
      foreignKey: "userId",
    });
    review.belongsTo(models.item, {
      foreignKey: "itemId",
    });
  };
  return review;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const item_type = sequelize.define(
    "item_type",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.UUID,
      },
      code_type_id: {
        type: DataTypes.STRING,
      },
      code_id: {
        type: DataTypes.STRING,
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
  item_type.associate = function (models) {
    // associations can be defined here
    item_type.belongsTo(models.item, {
      foreignKey: "item_id",
    });
    item_type.belongsTo(models.code_type, {
      foreignKey: "code_type_id",
    });
    item_type.belongsTo(models.code_info, {
      foreignKey: "code_id",
    });
  };
  return item_type;
};

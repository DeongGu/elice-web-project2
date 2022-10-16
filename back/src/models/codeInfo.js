"use strict";
module.exports = (sequelize, DataTypes) => {
  const code_info = sequelize.define(
    "code_info",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      codeName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "code_name",
      },
      codeNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: "code_number",
      },
      codeDesc: {
        type: DataTypes.TEXT,
        field: "code_desc",
      },
      code_type_id: {
        type: DataTypes.STRING,
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
  code_info.associate = function (models) {
    // associations can be defined here
    code_info.belongsTo(models.code_type, {
      foreignKey: "code_type_id",
    });
    code_info.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return code_info;
};

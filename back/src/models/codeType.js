"use strict";
module.exports = (sequelize, DataTypes) => {
  const code_type = sequelize.define(
    "code_type",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      codeTypeName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "code_type_name",
      },
      codeTypeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "code_type_level",
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
  code_type.associate = function (models) {
    code_type.hasMany(models.code_info, {
      foreignKey: "code_type_id",
      as: "code_info",
    });
    code_type.belongsTo(models.item, {
      foreignKey: "item_id",
    });
  };
  return code_type;
};

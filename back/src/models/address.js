"use strict";
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      addrName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "addr_name",
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "zip_code",
      },
      roadAddr: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "road_addr",
      },
      jibunAddr: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "jibun_addr",
      },
      addrUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "addr_username",
      },
      addrPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "addr_phone_number",
      },
      addrMessage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "addr_message",
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
  address.associate = function (models) {
    // associations can be defined here
    address.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };
  return address;
};

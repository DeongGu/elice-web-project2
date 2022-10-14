export default (sequelize, DataTypes) => {
  const CodeType = sequelize.define(
    "CodeType",
    {
      itemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      itemName: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      itemDesc: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("inStock", "onTrading", "outOfStock"),
        defaultValue: "inStock",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: false,
      paranoid: true,
      freezeTableName: true,
    }
  );

  Item.associate = (db) => {
    db.Item.hasMany(db.ItemTag);
  };

  return Item;
};

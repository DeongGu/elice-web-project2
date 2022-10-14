export default (sequelize, DataTypes) => {
  const ItemImage = sequelize.define(
    "ItemImage",
    {
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      imageNo: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(1000),
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
  ItemTag.associate = (db) => {
    db.ItemTag.belongsTo(db.Item);
  };

  return ItemTag;
};

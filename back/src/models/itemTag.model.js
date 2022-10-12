export default (sequelize, DataTypes) => {
  const ItemTag = sequelize.define(
    "ItemTag",
    {
      item_id: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true,
      },
      tag_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
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
  ItemTag.associate = (db) => {
    db.ItemTag.belongsTo(db.Item);
  };

  return ItemTag;
};

export default (sequelize, DataTypes) => {
  const UserImage = sequelize.define(
    "UserImage",
    {
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tagName: {
        type: DataTypes.STRING(300),
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

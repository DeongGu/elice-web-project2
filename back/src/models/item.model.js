export default (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      item_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      item_name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      itemd_desc: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(300),
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

  Item.associate = (db) => {
    db.Item.hasMany(db.ItemTag);
  };

  return Item;
};

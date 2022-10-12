export default (sequelize, DataTypes) => {
  const Music = sequelize.define(
    "Music",
    {
      path: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      username: {
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
  // Music.associate = (db) => {
  //   db.Music.belongsTo(db.User);
  // };

  return Music;
};

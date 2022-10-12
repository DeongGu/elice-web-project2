import bcrypt from "bcryptjs";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING(300), allowNull: false },
      password: { type: DataTypes.STRING(300), allowNull: false },
      nickname: { type: DataTypes.STRING(300), allowNull: false },
      role: { type: DataTypes.STRING(300), allowNull: false },
      username: { type: DataTypes.STRING(300), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(300), allowNull: false },
      profileImage: { type: DataTypes.STRING(300), allowNull: true },
      userDesc: { type: DataTypes.STRING(3000), allowNull: true },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: false,
      paranoid: true,
      freezeTableName: true,
    }
  );

  User.beforeSave(async (User) => {
    try {
      if (User.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(User.password, salt);
        User.password = hash;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  // User.prototype.isValidPassword = async function (pw) {
  //   try {
  //     return await bcrypt.compare(pw, this.password);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

  return User;
};

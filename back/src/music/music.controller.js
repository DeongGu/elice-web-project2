import db from "../models";

exports.createMusic = (data) => {
  try {
    const { username, name, album, userId, size, artist, path, file } = data;
    db.Music.create({
      username,
      name,
      album,
      size,
      artist,
      path,
      file,
      userId,
    });

    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findAllMusic = (query) => {
  try {
    return db.Music.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: "%" + query + "%",
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.findOneMusic = (id, ...ars) => {
  try {
    // For Update Music Data
    if (ars && ars[0] !== undefined) {
      const { username } = ars[0];
      return db.Music.findOne({
        attributes: [
          "id",
          "username",
          "name",
          "size",
          "file",
          "album",
          "artist",
          "createdAt",
        ],
        where: {
          id,
          username,
        },
      });
    }
    // For Detail Music Data
    return db.Music.findOne({
      attributes: [
        "id",
        "username",
        "name",
        "size",
        "file",
        "album",
        "artist",
        "createdAt",
      ],
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

exports.updateFile = (id, ...ars) => {
  try {
    // For Update Music Data
    if (ars && ars[0] !== undefined) {
      const { username } = ars[0];
      return db.Music.findOne({
        attributes: [
          "id",
          "username",
          "name",
          "size",
          "file",
          "album",
          "artist",
          "createdAt",
        ],
        where: {
          id,
          username,
        },
      });
    }
    // For Detail Music Data
    return db.Music.findOne({
      attributes: [
        "id",
        "username",
        "name",
        "size",
        "file",
        "album",
        "artist",
        "createdAt",
      ],
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

exports.updateMusic = (data) => {
  try {
    const { id, name, album, artist } = data;
    db.Music.update(
      {
        name,
        album,
        artist,
      },
      {
        where: { id },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

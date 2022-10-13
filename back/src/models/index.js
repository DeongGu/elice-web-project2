"use strict";

// const fs = require("fs");
// const path = require("path");
// const baseName = path.basename(__filename);
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "./../config/db.config.js")[env];

import Item from "../models/item.model";
import ItemTag from "../models/itemTag.model";
import Music from "../models/music.model";
import User from "../models/user.model";

const db = {};

// console.log("env : ", env);
// console.log(config);
// console.log(__dirname);

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// fs.readdirSync(__dirname).forEach((file) => {
//   if (path.extname(file) === '.js' && file !== baseName) {
//     const filePath = path.join(__dirname, file);
//     const r = require(filePath); // eslint-disable-line
//     console.log(filePath);
//     if (r) {
//       const model = require(path.join(filePath))(
//         sequelize,
//         Sequelize.DataTypes
//       );
//       db[model.name] = model;
//     }
//   }
// });

// console.log(file);

db.Item = Item(sequelize, Sequelize);
db.ItemTag = ItemTag(sequelize, Sequelize);
db.Music = Music(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

require("dotenv/config");
import cors from "cors";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import debug from "debug";
import { ValidationError } from "express-validation";
import { APIClientError } from "./helpers/APIResponse";
import redis from "redis";
import path from "path";
const dir = path.join(__dirname, "..", "public");

//--------------------------------------------
import { testRouter } from "./test/testRouter";
//--------------------------------------------

let redisClient = redis.createClient(
  process.env.DB_PORT_REDIS,
  process.env.DB_URL_REDIS
);
// const RedisStore = require("connect-redis")(session);
const app = express();
const log = debug("app");
app.set("port", process.env.SERVER_PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/images"));
app.use(express.static(dir));
app.use(cors());

app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // session
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SERVER_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Load the routes
// require("./routes.js")(app);
//-------------------------------------
app.use(testRouter);

//-------------------------------------

// Handle ValidationError
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json(err);
  }

  // return next(err);
  return res.status(500).json(err);
});

// Handle AuthenticationError

// Handle APIClientError
app.use((err, req, res, next) => {
  if (err instanceof APIClientError) {
    return res.status(err.status).json(err.jsonify());
  }

  return next(err);
});

app.listen(app.get("port"), () =>
  console.log(`app listening on ${app.get("port")}`)
);

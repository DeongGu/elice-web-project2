import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routers from "./routes";

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.router();
  }

  getApp() {
    return this.app;
  }

  setMiddleWare() {
    this.app.use(bodyParser.json());
    this.app.use(cors({ credentials: true, origin: true }));
  }

  router() {
    this.router = routers(this.app);
  }

  // handleError() {
  //   this.app.use(function (req, res, next) {
  //     var err = new Error("Not Found");
  //     err.status = 404;
  //     next(err);
  //   });
  // }
}

export default new App();

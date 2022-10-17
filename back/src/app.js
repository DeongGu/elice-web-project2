import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routers from "./routes";
import errorHandle from "./middlewares/errorHandle";

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.router();
    // this.handleError();
  }

  getApp() {
    return this.app;
  }

  setMiddleWare() {
    this.app.use(bodyParser.json());
    this.app.use(cors({ credentials: true, origin: true }));
  }

  router() {
    this.app.get("/", (req, res) => {
      return res.status(200).send("Team12 API");
    });
    this.router = routers(this.app);
  }
}

export default new App();

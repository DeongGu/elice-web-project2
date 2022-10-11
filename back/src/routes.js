import debug from "debug";
import HTTPStatus from "http-status";
import { APIClientError } from "./helpers/APIResponse";
import wrapAsync from "./helpers/wrapAsync";

// Routes
import userRoutes from "./users/users.routes";

const log = debug("routes");

const app = (app) => {
  // logger
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
    log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
    next();
  });

  // Insert routes below
  app.use("/api", userRoutes);

  // Handler for invalid routes
  app.all(
    "*",
    wrapAsync(async (req, res, next) => {
      throw new APIClientError(
        {
          message: "Invalid route.",
        },
        HTTPStatus.NOT_FOUND,
        HTTPStatus["404"]
      );
    })
  );
};

module.exports = app;

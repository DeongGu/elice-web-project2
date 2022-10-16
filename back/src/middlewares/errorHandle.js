import { APIClientError } from "./APIResponse";
import expressValidation from 'express-validation';

export default (App) => {
  const app = App;
  // Handle ValidationError
  app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
      return res.status(err.status).json(err);
    }

    return next(err);
  });

  // Handle AuthenticationError
  app.use((err, req, res, next) => {
    if (err.name && err.name === "AuthenticationError") {
      const response = new APIClientError(
        {
          message: "Passport.js authentication failed.",
        },
        HTTPStatus.UNAUTHORIZED,
        HTTPStatus["401"]
      );

      return res.status(err.status).json(response.jsonify());
    }

    return next(err);
  });

  // Handle APIClientError
  app.use((err, req, res, next) => {
    if (err instanceof APIClientError) {
      return res.status(err.status).json(err.jsonify());
    }

    return next(err);
  });
};

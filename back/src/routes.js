import usersRoutes from "./componets/users/users.routes";
// import { itemRoutes } from "./componets/items/items.routes";
// import { dibsRoutes } from "./componets/dibs/dibs.routes";
// import { orderRoutes } from "./componets/orders/orders.routes";
// import { deliveryRoutes } from "./componets/deliveries/deliveries.routes";
// import { reviewRoutes } from "./componets/reviews/reviews.routes";
// import { adderssRoutes } from "./componets/adderss/adderss.routes";
import { APIClientError } from "./middlewares/APIResponse";
import wrapAsync from "./middlewares/wrapAsync";

export default (App) => {
  const router = App;
  // logger
  // app.use((req, res, next) => {
  //   log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  //   next();
  // });

  router.use("/", usersRoutes);
  // app.use(itemRoutes);
  // app.use(dibsRoutes);
  // app.use(orderRoutes);
  // app.use(deliveryRoutes);
  // app.use(reviewRoutes);
  // app.use(adderssRoutes);

  // Handler for invalid routes
  router.all(
    "*",
    // eslint-disable-next-line
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

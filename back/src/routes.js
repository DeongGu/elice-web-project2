import usersRoutes from "./componets/users/users.routes";
import itemRoutes from "./componets/items/items.routes";
// import dibsRoutes from "./componets/dibs/dibs.routes";
// import orderRoutes from "./componets/orders/orders.routes";
// import deliveryRoutes from "./componets/deliveries/deliveries.routes";
// import reviewRoutes  from "./componets/reviews/reviews.routes";
// import adderssRoutes  from "./componets/adderss/adderss.routes";

export default (App) => {
  const router = App;
  // logger
  // router.use((req, res, next) => {
  //   log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  //   next();
  // });

  router.use("/", usersRoutes);
  router.use("/", itemRoutes);
  // router.use("/", dibsRoutes);
  // router.use("/", orderRoutes);
  // router.use("/", deliveryRoutes);
  // router.use("/", reviewRoutes);
  // router.use("/", adderssRoutes);
};

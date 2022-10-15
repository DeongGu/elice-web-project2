import usersRoutes from "./users/users.routes";
import itemRoutes from "./items/items.routes";
import dibsRoutes from "./dibs/dibs.routes";
import orderRoutes from "./orders/orders.routes";
import deliveryRoutes from "./deliveries/deliveries.routes";
import reviewRoutes from "./reviews/reviews.routes";
import adderssRoutes from "./adderss/adderss.routes";

export default (App) => {
  const router = App;
  router.use("/users", usersRoutes);
  router.use("/items", itemRoutes);
  router.use("/dibs", dibsRoutes);
  router.use("/orders", orderRoutes);
  router.use("/deliveries", deliveryRoutes);
  router.use("/review", reviewRoutes);
  router.use("/adderss", adderssRoutes);

  router.use("/", (req, res) => {
    return res.status(200).send("Team12 API");
  });
};

import usersRoutes from "./components/users/users.routes";
import itemsRoutes from "./components/items/items.routes";
import dibsRoutes from "./components/dibs/dibs.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

export default (App) => {
  const router = App;
  router.use("/", usersRoutes);
  router.use("/", itemsRoutes);
  router.use("/", dibsRoutes);
  router.use("*", globalErrorHandler);
};

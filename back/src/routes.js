import usersRoutes from "./components/users/users.routes";
import itemRoutes from "./components/items/items.routes";
import dibsRoutes from "./components/dibs/dibs.routes";

export default (App) => {
  const router = App;
  router.use("/", usersRoutes);
  router.use("/", itemRoutes);
  router.use("/", dibsRoutes);
};

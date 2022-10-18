import usersRoutes from "./components/users/users.routes";
import itemRoutes from "./components/items/items.routes";
// import dibsRoutes from "./componets/dibs/dibs.routes";

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
};

import usersRoutes from "./users/users.routes";
import itemRoutes from "./items/items.routes";
import musicRoutes from "./music/music.routes";

export default (App) => {
  const router = App;
  router.use("/users", usersRoutes);
  router.use("/items", itemRoutes);
  router.use("/music", musicRoutes);
  router.use("/", (req, res) => {
    return res.status(200).send("Team12 API");
  });
};

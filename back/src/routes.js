import usersRoutes from "./users/users.routes";
import musicRoutes from "./music/music.routes";

export default (App) => {
  const router = App;

  router.use("/users", usersRoutes);
  router.use("/music", musicRoutes);
};

import http from "http";
import App from "./app";
import db from "./models";
import { PORT } from "./config/env.config";

const serverHandler = () => {
  console.log("서버 가동 ON PORT: ", PORT);
};

// Async Await
async function getTasksAsync() {
  try {
    const tasks = await db.Task.findAll();
    tasks.forEach((task) => {
      console.log(task.taskName);
    });
  } catch (err) {
    console.log(err);
  }
}

http.createServer(App.getApp()).listen(PORT, async () => {
  await db.sequelize.authenticate();
  await db.sequelize
    .sync({ alter: true })
    // .sync({ force: true })
    .then(() => {
      console.log("데이터베이스 연결 성공");
    })
    .catch((error) => {
      console.error(error);
    });
  serverHandler();
  // getTasksAsync();
});

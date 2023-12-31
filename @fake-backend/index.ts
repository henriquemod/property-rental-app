import jsonServer from "json-server";

import db, { mockAdminUser } from "./db";

const server = jsonServer.create();
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser);

const TOKEN = "123456789";

server.use(middlewares);
server.post("/signin", (req, res) => {
  const { body } = req;
  if (body.username === "admin" && body.password === "admin") {
    return res.status(200).json({
      token: TOKEN,
      user: mockAdminUser,
    });
  }
  return res.status(401).json({
    message: "Username or password is incorrect",
  });
});
server.put("/user", (req, res) => {
  const { headers } = req;
  if (headers.authorization !== `Bearer ${TOKEN}`) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  return res.status(204).json({});
});
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

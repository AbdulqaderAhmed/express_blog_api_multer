import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./config/dbConnection.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { auth } from "./src/routers/userRoute.js";
import { router } from "./src/routers/blogRouter.js";

dbConnection();

const port = process.env.SERVER_PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/auth", auth);
app.use("/api/blog", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application started at http:localhost:${port}`);
});

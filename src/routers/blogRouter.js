import express from "express";
import { uploadMiddleware } from "../middlewares/uploadHander.js";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from "../controllers/blogController.js";

export const router = express.Router();

router.use(uploadMiddleware.single("image"));

router.route("/").get(getAllBlog).post(createBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

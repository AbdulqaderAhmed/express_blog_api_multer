import expressAsyncHandler from "express-async-handler";
import { Blog } from "../models/blogModel.js";

export const getAllBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.find().sort({ createdAt: "decsending" });
  res.status(200).json(blog);
});

export const getBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error("Page not found!");
  } else {
    res.status(200).json(blog);
  }
});

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    res.status(400);
    throw new Error("All fields are required!");
  } else {
    if (req.file) {
      image = req.file.filename;
      await Blog.create({
        user_id: req.user.id,
        title,
        description,
        image,
      });

      const blog = await Blog.find().sort({ createdAt: "decsending" });
      res.status(201).json({ message: "Blog created!", blog });
    } else {
      res.status(400);
      throw new Error("Invalid file");
    }
  }
});

export const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id !== req.user.id) {
    res.status(403);
    throw new Error("User cannot edit this post!");
  } else {
    const uploadBlog = await Blog.findByIdAndUpdate(id, req.body);
    if (!updateBlog) {
      res.status(404);
      throw new Error("Page not found!");
    } else {
      const blog = await Blog.find().sort({ createdAt: "decsending" });
      res.status(202).json({ message: "Blog updated!", blog });
    }
  }
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id !== req.user.id) {
    res.status(403);
    throw new Error("User cannot edit this post!");
  } else {
    const deleteBlog = await Blog.findByIdAndDelete(id, req.body);
    if (!deleteBlog) {
      res.status(404);
      throw new Error("Page not found!");
    } else {
      const blog = await Blog.find().sort({ createdAt: "decsending" });
      res.status(202).json({ message: "Blog deleted!", blog });
    }
  }
});

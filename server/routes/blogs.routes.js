import { Router } from "express";
import { CreateBlog, deleteBlog, deleteAllBlogs, editBlog } from "../controllers/blogs.controllers.js";


const router = Router();

router.post("/", CreateBlog);
router.delete('/:id', deleteBlog);
router.delete("/", deleteAllBlogs);
router.put("/:id", editBlog);


export default router;


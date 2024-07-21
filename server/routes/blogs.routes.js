import { Router } from "express";
import { CreateBlog, deleteBlog, deleteAllBlogs } from "../controllers/blogs.controllers.js";


const router = Router();

router.post("/", CreateBlog);
router.delete('/:id', deleteBlog);
router.delete("/", deleteAllBlogs);


export default router;


import { Router } from "express";
import { fetchBlogs } from "../controllers/fetchblogs.controllers.js";

const router = Router();


router.get('/', fetchBlogs);

export default router;
import { Router } from "express";
import { registerUser, useLogin } from "../controllers/user.controllers.js"; 

const router = Router();

router.post("/register", registerUser);
router.post("/login", useLogin);


export default router;

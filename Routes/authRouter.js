import {signup, login, logout} from "../Controllers/authController.js";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login",  login);
router.delete("/logout", logout);

export default router;  
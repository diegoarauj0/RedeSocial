import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post("/api/auth/register", userController.register)
router.post("/api/auth/login", userController.login)
router.get("/api/auth/logout", userController.logout)

export default router
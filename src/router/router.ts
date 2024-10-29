import { Router } from "express";
import userController from "../controllers/userController";
import postController from "../controllers/postController";

const router = Router();

router.post("/api/auth/register", userController.register)
router.post("/api/auth/login", userController.login)
router.get("/api/auth/logout", userController.logout)

router.use("/api/user", userController.middleware)
router.get("/api/user", userController.get)
router.get("/api/user/:userId", userController.get)
router.delete("/api/user", userController.delete)

router.use("/api/post", userController.middleware)
router.post("/api/post", postController.create)
router.delete("/api/post/:postId", postController.delete)
router.get("/api/post/:postId", postController.get)
router.get("/api/posts", postController.getAll)

export default router
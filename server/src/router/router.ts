import { Router } from "express"
import authController from "../controllers/authController"
import userController from "../controllers/userController"
import postController from "../controllers/postController"

const router = Router()
router.use("/api", authController._router)
router.use("/api", userController._router)
router.use("/api", postController._router)

export default router
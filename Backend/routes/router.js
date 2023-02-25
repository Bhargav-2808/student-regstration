import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authcontroller.js";
import { getUserContorller,editUserController,deleteUserController } from "../controllers/userController.js";
import protect from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserContorller);
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/edit/:id",protect,editUserController);
router.delete("/delete/:id",protect,deleteUserController);


export default router;

import express from "express";
import {
  loginController,
  registerController,
  upload,
} from "../controllers/authcontroller.js";
import { getUserContorller,editUserController,deleteUserController, profileContorller } from "../controllers/userController.js";
import protect from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserContorller);
router.get("/profile/:id", protect, profileContorller);
router.post("/register",upload.single("pic"), registerController);
router.post("/login", loginController);
router.put("/edit/:id",protect,upload.single("pic"),editUserController);
// router.put("/editPwd/:id",protect,editPasswordController);
router.delete("/delete/:id",protect,deleteUserController);


export default router;

import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controllers/Admin/userAuthControlller.js";
import {
  deleteUserController,
  editUserContorller,
  getUserContorller,
  userProfileController,
} from "../controllers/Admin/userController.js";
import { upload } from "../Multer/multer.js";
import protect from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserContorller);
router.get("/profile/:id", protect, userProfileController);

router.post("/login", userLoginController);
router.post("/register", upload.single("pic"), userRegisterController);
router.put("/edit/:id", upload.single("pic"), protect, editUserContorller);
router.delete("/delete/:id", protect, deleteUserController);

export default router;

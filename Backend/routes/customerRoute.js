import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/customer/authController.js";
import {
  getCustomerContorller,
  editCustomerContorller,
  deleteCustomerContorller,
  profileContorller,
} from "../controllers/customer/customerController.js";
import { upload, uploadImage } from "../Multer/multer.js";
import protect from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCustomerContorller);
router.get("/profile/:id", protect, profileContorller);

router.post("/login", loginController);
router.post("/register", upload.single("pic"), registerController);
router.post("/imageupload", upload.single("pic"), uploadImage);
router.put("/edit/:id", protect, upload.single("pic"), editCustomerContorller);
// router.put("/editPwd/:id",protect,editPasswordController);
router.delete("/delete/:id", protect, deleteCustomerContorller);

export default router;

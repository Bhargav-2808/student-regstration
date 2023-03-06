import express from "express";
import {
  addProductController,
  deleteProductController,
  editProductContorller,
  getAllProductContorller,
  getProductController,
} from "../controllers/Products/productController.js";
import protect from '../utils/authMiddleware.js';

const router = express.Router();

router.get("/", protect, getAllProductContorller);
router.get("/product/:id", protect, getProductController);
router.post("/addproduct", protect,addProductController);
router.put("/edit/:id", protect, editProductContorller);
router.delete("/delete/:id", protect, deleteProductController);
export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/db.js";
import "./modals/customerSchema.js";
import "./modals/userSchema.js";
import "./modals/productSchema.js"
import customerRoute from "./routes/customerRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5555;
const corsOptons = {
  origin: process.env.CLIENT_URL,
};
const __dirname = path.resolve();
console.log(__dirname);
app.use(cors(corsOptons));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(path.join(__dirname, "../test-app/public/Images"));
app.use(express.static(path.join(__dirname, "../test-app/public/Images")));

// app.use(express.static("D:\Lucent\Practice\Backend\React_form\test-app\public\Images"));
app.use("/customer", customerRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`servere starting on the port ${port}`);
});

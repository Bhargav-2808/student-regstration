import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/db.js";
import "./modals/userSchema.js";
import router from "./routes/router.js";
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
console.log(path.join(__dirname,"../test-app/public/Images"));
app.use(express.static(path.join(__dirname,"../test-app/public/Images")));

// app.use(express.static("D:\Lucent\Practice\Backend\React_form\test-app\public\Images"));
app.use("/user", router);

app.listen(port, () => {
  console.log(`servere starting on the port ${port}`);
});

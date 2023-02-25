import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/db.js";
import "./modals/userSchema.js";
import router from "./routes/router.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5555;
const corsOptons = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptons));
app.use(express.json());
app.use("/user",router);

app.listen(port,()=>{
  console.log(`servere starting on the port ${port}`);
})

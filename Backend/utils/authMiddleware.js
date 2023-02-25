import jwt from "jsonwebtoken";
import User from "../modals/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findByPk(decode.id);
      next();
    } catch (error) {
      res.status(401);
      res.status(401).json({ error: "Not authorized, no token" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export default protect;

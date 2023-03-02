import jwt from "jsonwebtoken";
import Customer from "../modals/customerSchema.js";
import dotenv from "dotenv";
import User from "../modals/userSchema.js";
dotenv.config();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decode.id,"decode");
      const customerExist = await Customer.findOne({
        where: { id: decode.id },
      });
      const userExist = await User.findOne({ where: { id: decode.id } });
      // console.log(userExist,"user");
      if (customerExist) {
        req.customer = customerExist;
      }

      if (userExist) {
        req.user = userExist;
      }
      console.log(userExist);
      // console.log(req.user,"auth");
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

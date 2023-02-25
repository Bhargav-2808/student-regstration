import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generatePassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, newPassword) => {
  console.log(bcrypt.compareSync(newPassword, password));
  return bcrypt.compareSync(newPassword, password);
};

const genrateToken = (id) => {``
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};


export { generatePassword, comparePassword, genrateToken };

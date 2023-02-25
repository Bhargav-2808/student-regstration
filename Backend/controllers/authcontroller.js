import User from "../modals/userSchema.js";
import {
  comparePassword,
  generatePassword,
  genrateToken,
} from "../utils/helper.js";
import validation from "../utils/validation.js";

const registerController = async (req, res) => {
  const { fname, lname, mobile, email, add1, add2, pincode, password } =
    req.body;

  let message = validation(req.body);
  if (message.length != 0) {
    res.status(401).json({ error: message });
  } else {
    try {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        res.status(400).json({ error: "User already exists" });
      } else {
        console.log("called");

        const encrypted = generatePassword(password);
        try {
          const user = await User.create({
            fname,
            lname,
            mobile,
            email,
            add1,
            add2,
            pincode,
            password: encrypted,
          });
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error.message);
        }
      }
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error.message);
    }
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: "All Fields area required" });
  } else {
    const user = await User.findOne({ where: { email:email } });

    const data = user?.dataValues;
    console.log(data);
    if (user && comparePassword(data.password, password)) {
      res.json({
        id: data.id,
        fullname: data.fname + " " + data.lname,
        isAdmin: data.isAdmin,
        email: data.email,
        token: genrateToken(data.id),
      });
    } else {
      res.status(401).json({ error: "Invalid Email or Password" });
    }
  }
};

export { registerController, loginController };

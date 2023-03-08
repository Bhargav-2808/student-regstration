import Customer from "../../modals/customerSchema.js";

import {
  comparePassword,
  generatePassword,
  genrateToken,
} from "../../utils/helper.js";
import { customerValidation } from "../../utils/validation.js";



const registerController = async (req, res) => {
  let file;
  const { fname, lname, mobile, email, add1, add2, pincode, password } =
    req.body;
  console.log(req.file);
  if (req.file) {
    file = req.file.path.replace(/\\/g, "/");
  } else {
    file = null;
  }
  // console.log(pic,"pic");

  let message = customerValidation(req.body);
  if (message.length != 0) {
    res.status(400).json({ error: message });
  } else {
    try {
      const userExist = await Customer.findOne({ where: { email } });

      if (userExist) {
        res.status(400).json({ error: "Customer already exists" });
      } else {
        const encrypted = generatePassword(password);
        try {
          const user = await Customer.create({
            fname,
            lname,
            mobile,
            email,
            add1,
            add2,
            pincode,
            password: encrypted,
            pic: file,
          });
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error.message);
        }
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400).json({ error: "All Fields are required" });
  } else {
    const user = await Customer.findOne({ where: { email: email } });

    const data = user?.dataValues;
    console.log(data);
    console.log(user?.dataValues?.id,"idlogin");
    if (user && comparePassword(data.password, password)) {
      res.json({
        id: user.dataValues.id,
        fullname: data.fname + " " + data.lname,
        isAdmin: false,
        email: data.email,
        token: genrateToken(data.id),
      });
    } else {
      res.status(400).json({ error: "Invalid Email or Password" });
    }
  }
};

export { registerController, loginController };

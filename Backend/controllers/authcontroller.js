import multer from "multer";
import User from "../modals/userSchema.js";
import path from "path";
import {
  comparePassword,
  generatePassword,
  genrateToken,
} from "../utils/helper.js";
import { validation } from "../utils/validation.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      // "D:\Lucent\Practice\Backend\React_form\test-app\public\Images"
      path.join(path.resolve(), "../test-app/public/Images")
    );
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `img-${Date.now()}.${ext}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

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

  let message = validation(req.body);
  if (message.length != 0) {
    res.status(400).json({ error: message });
  } else {
    try {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        res.status(400).json({ error: "User already exists" });
      } else {
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

  if (!email || !password) {
    res.status(400).json({ error: "All Fields area required" });
  } else {
    const user = await User.findOne({ where: { email: email } });

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
      res.status(400).json({ error: "Invalid Email or Password" });
    }
  }
};

export { registerController, loginController };

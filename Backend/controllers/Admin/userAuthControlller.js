import { Permission, Rules, User } from "../../modals/userSchema.js";
import {
  comparePassword,
  generatePassword,
  genrateToken,
} from "../../utils/helper.js";
import { userValidation } from "../../utils/validation.js";

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All Fields area required" });
  } else {
    const user = await User.findOne({ where: { email: email } });

    const data = user?.dataValues;
    if (user && comparePassword(data.password, password)) {
      res.status(201).json({
        id: data.id,
        fullname: data.fname + " " + data.lname,
        email: data.email,
        token: genrateToken(data.id),
      });
    } else {
      res.status(400).json({ error: "Invalid Email or Password" });
    }
  }
};

const userRegisterController = async (req, res) => {
  const { fname, lname, mobile, email, password, rulesData } =
    req.body;

  let message = userValidation(req.body);
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
            password: encrypted,
          });

          if (rulesData.length !== 0) {
            rulesData?.map(async (rule) => {
              try {
                let ruleData = await Rules.findOne({
                  where: {
                    ruleName: rule.rule,
                  },
                });

                let permits = await Permission.create({
                  ruleId: ruleData.dataValues.id,
                  userId: user.dataValues.id,
                  permission: rule.permit,
                });
              } catch (error) {
                res.status(500).json({ error });
              }
            });
          }

          res.status(201).json({
            user,
          });
        } catch (error) {
          res.status(500).json(error.message);
        }
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

export { userLoginController, userRegisterController };

import User from "../modals/userSchema.js";
import { generatePassword } from "../utils/helper.js";
import validation from "../utils/validation.js";

const getUserContorller = async (req, res) => {


  const pageNumber = parseInt(req.query.page);
  const sizeNumber = parseInt(req.query.size);

  let page = 0,
    size = 10;
  if (!isNaN(pageNumber) && pageNumber > 0) {
    page = pageNumber;
  }

  if (!isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 10) {
    size = sizeNumber;
  }

  try {
    const data = await User.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.status(201).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const editUserController = async (req, res) => {
  const { fname, lname, mobile, email, add1, add2, pincode, password } =
    req.body;
  let message = validation(req.body);

  console.log(req.user?.dataValues?.id, "edit");
  if (message.length != 0) {
    res.status(401).json(message);
  } else {
    try {
      if (req.user?.dataValues?.id === parseInt(req.params.id)) {
        const encrypted = generatePassword(password);
        const user = await User.update(
          {
            fname,
            lname,
            mobile,
            email,
            add1,
            add2,
            pincode,
            password: encrypted,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        if (user) {
          res.status(201).json({ sucess: "User Updated Successfully" });
        }
      } else {
        res.status(401).json({ error: "User can not edit diffrent user" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
const deleteUserController = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.is,
      },
    });
    if (user) {
      res.status(201).json({ sucess: "User Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { getUserContorller, editUserController, deleteUserController };

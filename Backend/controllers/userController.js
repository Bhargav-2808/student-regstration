import { Op } from "sequelize";
import User from "../modals/userSchema.js";
import { generatePassword } from "../utils/helper.js";
import { validation, isValidPwd } from "../utils/validation.js";
import { unlink } from "fs";
const getUserContorller = async (req, res) => {
  let data;
  const pageNumber = parseInt(req.query.page);
  const sizeNumber = parseInt(req.query.size);
  const query = req.query.search;

  let page = 0,
    size = 10;
  if (!isNaN(pageNumber) && pageNumber > 0) {
    page = pageNumber;
  }

  if (!isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 10) {
    size = sizeNumber;
  }

  try {
    if (query) {
      data = await User.findAndCountAll({
        where: {
          [Op.or]: [
            {
              fname: {
                [Op.like]: `%${query}%`,
              },
            },

            {
              lname: {
                [Op.like]: `%${query}%`,
              },
            },

            {
              mobile: {
                [Op.like]: `%${query}%`,
              },
            },

            {
              email: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              pincode: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              add1: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              add2: {
                [Op.like]: `%${query}%`,
              },
            },
          ],
        },
        limit: size,
        offset: page * size,
      });
    } else {
      data = await User.findAndCountAll({
        limit: size,
        offset: page * size,
      });
    }

    res.status(201).json({
      data,
      totalPage: Math.ceil(data.count / size),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const profileContorller = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    if (data) {
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// const editPasswordController = async (req, res) => {
//   let user;
//   const { password, cPassword } = req.body;

//   if (!isValidPwd(password)) {
//     res.status(401).json({ error: "password should be in valid formate" });
//   } else if (password === cPassword) {
//     try {
//       if (
//         req.user?.dataValues?.id === parseInt(req.params.id) ||
//         req.user.dataValues.isAdmin
//       ) {
//         const encrypted = generatePassword(password);
//         user = await User.update(
//           {
//             password: encrypted,
//           },
//           {
//             where: {
//               id: req.params.id,
//             },
//           }
//         );

//         if (user) {
//           res.status(201).json({ sucess: "Password Updated Successfully" });
//         }
//       } else {
//         res
//           .status(401)
//           .json({ error: "User can not edit diffrent user's Password" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(401).json({ error: "Both password should be same" });
//   }
// };

const editUserController = async (req, res) => {
  let user, file, message;
  // console.log(req);
  const {
    fname,
    lname,
    mobile,
    email,
    add1,
    add2,
    pincode,
    password,
    cPassword,
  } = req.body;

  if (password && cPassword) {
    if (!isValidPwd(password)) {
      res.status(400).json({ error: "password should be in valid formate" });
    } else if (password === cPassword) {
      try {
        if (
          req.user?.dataValues?.id === parseInt(req.params.id) ||
          req.user.dataValues.isAdmin
        ) {
          const encrypted = generatePassword(password);
          user = await User.update(
            {
              password: encrypted,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );

          if (user) {
            res.status(201).json({ sucess: "Password Updated Successfully" });
          }
        } else {
          res
            .status(400)
            .json({ error: "User can not edit diffrent user's Password" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Both password should be same" });
    }
  } else {
    message = validation(req.body);
    if (req.file) {
      file = req.file.path.replace(/\\/g, "/");
    } else {
      file = null;
    }

    if (message.length != 0) {
      res.status(501).json(message);
    } else {
      try {
        console.log(req.user.dataValues);
        if (
          req.user?.dataValues?.id === parseInt(req.params.id) ||
          req.user.dataValues.isAdmin
        ) {
          user = await User.update(
            {
              fname,
              lname,
              mobile,
              email,
              add1,
              add2,
              pincode,
              pic: file,
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
          res.status(400).json({ error: "User can not edit diffrent user" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  //
  // console.log(req.user?.dataValues?.id, "edit");
};
const deleteUserController = async (req, res) => {
  try {
    const newUser = await User.findByPk(req.params.id);

    if (newUser.dataValues.pic) {
      unlink(newUser.dataValues.pic, (err) => {
        console.log(err);
        if (err) throw err;
      });
    }

    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (user) res.status(201).json({ sucess: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getUserContorller,
  editUserController,
  deleteUserController,
  profileContorller,
};

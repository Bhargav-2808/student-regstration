import User from "../../modals/userSchema.js";
import { userValidation } from "../../utils/validation.js";

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

  if (
    req.user.dataValues.adminRead === false &&
    req.user.dataValues.adminWrite === false &&
    !req.user.dataValues.isSuperAdmin
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
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

const userProfileController = async (req, res) => {
  if (req.user?.dataValues?.id !== parseInt(req.params.id)) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      const data = await User.findByPk(req.params.id);
      if (data) {
        res.status(201).json(data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

const editUserContorller = async (req, res) => {
  let user, file, message;
  // console.log(req);
  const {
    fname,
    lname,
    mobile,
    email,
    password,
    cPassword,
    adminRead,
    adminWrite,
    productRead,
    productWrite,
    isSuperAdmin,
  } = req.body;

  if (
    !req.user.dataValues.isSuperAdmin &&
    req.user.dataValues.adminWrite === false
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else if (password && cPassword) {
    if (!isValidPwd(password)) {
      res.status(400).json({ error: "password should be in valid formate" });
    } else if (password === cPassword) {
      try {
        {
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
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Both password should be same" });
    }
  } else {
    message = userValidation(req.body);
    if (req.file) {
      file = req.file.path.replace(/\\/g, "/");
    } else {
      file = null;
    }

    if (message.length != 0) {
      res.status(501).json(message);
    } else {
      try {
        user = await User.update(
          {
            fname,
            lname,
            mobile,
            email,
            adminRead,
            adminWrite,
            productRead,
            productWrite,
            isSuperAdmin,
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
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
};

const deleteUserController = async (req, res) => {
  if (
    !req.user.dataValues.isSuperAdmin &&
    req.user.dataValues.adminWrite === false
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
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
  }
};

export {
  getUserContorller,
  userProfileController,
  editUserContorller,
  deleteUserController,
};

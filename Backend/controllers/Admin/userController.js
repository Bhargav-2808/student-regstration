import { Op } from "sequelize";
import { Permission, Rules, User } from "../../modals/userSchema.js";
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

  const authPemission = req.permission.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 1;
  });
  if (
    authPemission[0].dataValues.permission !== false &&
    authPemission[0].dataValues.permission !== true &&
    !req.user.dataValues.isSuperAdmin
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      const countData = await User.findAll({});
      console.log(countData.length);
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
          include: Permission,
        });
      } else {
        data = await User.findAndCountAll({
          limit: size,
          offset: page * size,
          include: Permission,
        });
      }
      console.log(data);

      res.status(201).json({
        data,
        totalPage: Math.ceil(data.count / size),
        count: countData.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
};

const userProfileController = async (req, res) => {
  console.log(req.user?.dataValues?.id, "user 81");
  console.log(req.params.id, "params 82");
  if (req.user?.dataValues?.id !== parseInt(req.params.id)) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      const data = await User.findByPk(req.params.id, { include: Permission });
  
      const neWobj = {
        id:data.id,
        fname: data.fname,
        lanme: data.lname,
        email: data.email,
        mobile: data.mobile,
        ruleData: data.permissions,
      };
      console.log(data);
      if (data) {
        res.status(201).json(neWobj);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

const editUserContorller = async (req, res) => {
  let user, message;
  // console.log(req);
  const { fname, lname, mobile, email, password, cPassword, rulesData } =
    req.body;

  const authPemission = req.permission.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 2;
  });

  if (
    (!req.user.dataValues.isSuperAdmin &&
      authPemission[0].dataValues.permission !== true) ||
    parseInt(req.params.id) ===
      parseInt(req.user.dataValues.id || parseInt(req.params.id) === 1)
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

    if (message.length != 0) {
      res.status(400).json(message);
    } else {
      try {
        user = await User.update(
          {
            fname,
            lname,
            mobile,
            email,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        if (rulesData.length !== 0) {
          rulesData?.map(async (rule) => {
            try {
              let ruleData = await Rules.findOne({
                where: {
                  ruleName: rule.rule,
                },
              });

              let permissionCheck = await Permission.findOne({
                where: {
                  ruleId: ruleData.dataValues.id,
                  userId: req.params.id,
                },
              });
              if (permissionCheck) {
                await Permission.update(
                  {
                    permission: rule.permit,
                  },
                  {
                    where: {
                      userId: req.params.id,
                      ruleId: ruleData.dataValues.id,
                    },
                  }
                );
              } else {
                await Permission.create({
                  ruleId: ruleData.dataValues.id,
                  userId: req.params.id,
                  permission: rule.permit,
                });
              }
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          });
          // console.log("called user");
        }
        res.status(201).json({ sucess: "User Updated Successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
};

const deleteUserController = async (req, res) => {
  const authPemission = req.permission.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 1;
  });

  if (
    (!req.user.dataValues.isSuperAdmin &&
      authPemission[0].dataValues.permission !== true) ||
    parseInt(req.params.id) ===
      parseInt(req.user.dataValues.id || parseInt(req.params.id) === 1)
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      await Permission.destroy({
        where: {
          userId: req.params.id,
        },
      });

      const result = await User.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (result) res.status(200).json({ sucess: "User Deleted Successfully" });
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

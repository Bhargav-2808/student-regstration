import User from "../modals/userSchema.js";
import validation from "../utils/validation.js";

const getUserContorller = async (req, res) => {
  // try {
  //   const data = await User.findAll();
  //   res.status(201).json(data);
  // } catch (error) {
  //   res.status(500).json(error.message);
  // }
  console.log(req.query);

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

  console.log(page, size);
  try {
    const data = await User.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    console.log(data);
    res.status(201).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const editUserController = async (req, res) => {

  let message = validation(req.body);
  if (message.length != 0) {
    console.log(message);
    res.status(401).json(message);
  } else {
    try {
      const user = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (user) {
        res.status(201).json({ sucess: "User Updated Successfully" });
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

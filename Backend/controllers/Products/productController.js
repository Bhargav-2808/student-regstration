import { Op } from "sequelize";
import { Product, Variants } from "../../modals/productSchema.js";
import { Permission, User } from "../../modals/userSchema.js";

const getAllProductContorller = async (req, res) => {
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

  // console.log(req.permission);
  const authPemission = req?.permission?.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 2;
  });
  // console.log(authPemission);
  if (
    authPemission[0]?.dataValues.permission !== false &&
    authPemission[0]?.dataValues.permission !== true &&
    !req.user.dataValues.isSuperAdmin
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      const countData = await Product.findAll({});

      if (query) {
        data = await Product.findAndCountAll({
          where: {
            [Op.or]: [
              {
                productName: {
                  [Op.like]: `%${query}%`,
                },
              },

              {
                category: {
                  [Op.like]: `%${query}%`,
                },
              },

              {
                description: {
                  [Op.like]: `%${query}%`,
                },
              },
            ],
          },
          limit: size,
          offset: page * size,
          count: countData,
          include: Variants,
        });
      } else {
        data = await Product.findAndCountAll({
          limit: size,
          offset: page * size,
          count: countData,

          include: Variants,
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
  }
};

const getProductController = async (req, res) => {
  const authPemission = req.permission.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 2;
  });
  if (
    authPemission[0].dataValues.permission !== false &&
    authPemission[0].dataValues.permission !== true &&
    !req.user.dataValues.isSuperAdmin
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      const data = await Product.findByPk(req.params.id, {
        include: Variants,
      });
      console.log(data);
      if (data) {
        res.status(201).json(data);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

const addProductController = async (req, res) => {
  const { productName, category, description, defaultVariantId, variants } =
    req.body;

  // console.log(req.body);

  const authPemission = req.permission.filter((item) => {
    return parseInt(item.dataValues.ruleId) === 2;
  });

  if (
    (!req.user.dataValues.isSuperAdmin &&
      authPemission[0].dataValues.permission !== true) ||
    parseInt(req.params.id) === 1
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  }
  try {
    const product = await Product.create({
      productName,
      category,
      description,
      defaultVariantId,
    });

    if (variants.length !== 0) {
      variants?.map(async (item) => {
        try {
          let variant = await Variants.create({
            productId: product.dataValues.id,
            option: item.option,
            optionValue: item.optionValue,
            quantity: item.quantity,
            variantImage: item.variantImage,
            sku: item.sku,
          });
        } catch (error) {
          res.status(500).json({ error });
        }
      });

      res.status(201).json({
        product,
      });
    } else {
      res.status(400).json({ error: "Something Went Wrong!" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editProductContorller = async (req, res) => {
  const { productName, category, description, defaultVariantId, variants } =
    req.body;

  const prevVariant = await Product.findByPk(req.params.id, {
    include: Variants,
  });

  const filterVariant = prevVariant.dataValues.variants?.filter((item) => {
    return !variants.some((item1) => item1.id === item.id);
  });

  filterVariant.map(async (item) => {
    const res = await Variants.destroy({
      where: {
        id: item.id,
      },
    });
  });

  let product;

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
  } else {
    try {
      product = await Product.update(
        {
          productName,
          category,
          description,
          defaultVariantId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (variants.length !== 0) {
        variants?.map(async (item) => {
          console.log(item.sku, req.params.id, "");

          try {
            if (item?.id) {
              let variant = await Variants.update(
                {
                  option: item.option,
                  optionValue: item.optionValue,
                  quantity: item.quantity,
                  variantImage: item.file ?? null,
                },
                {
                  where: {
                    id: item.id,
                  },
                }
              );
            } else {
              let variant = await Variants.create({
                productId: req.params.id,
                option: item.option,
                optionValue: item.optionValue,
                quantity: item.quantity,
                variantImage: item.file ?? null,
                sku: item.sku,
              });
            }
          } catch (error) {
            res.status(500).json({ error });
          }
        });
      }

      res.status(201).json({ sucess: "Product Updated Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteProductController = async (req, res) => {
  const authPemission = req?.permission.filter((item) => {
    return parseInt(item?.dataValues.ruleId) === 2;
  });
  if (
    (!req.user.dataValues.isSuperAdmin &&
      authPemission[0]?.dataValues.permission !== true) ||
    parseInt(req.params.id) === 1
  ) {
    res.status(401).json({ error: "Unauthorized User!" });
  } else {
    try {
      await Variants.destroy({
        where: {
          productId: req.params.id,
        },
      });

      const result = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (result)
        res.status(200).json({ sucess: "Product Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export {
  getAllProductContorller,
  getProductController,
  addProductController,
  editProductContorller,
  deleteProductController,
};

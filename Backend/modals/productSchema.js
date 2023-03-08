import user from "../db/db.js";
import { DataTypes } from "sequelize";

const Product = user.define("product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Variants = user.define("variants", {
  option: {
    type: DataTypes.STRING,
  },
  optionValue: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variantImage: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Product.hasMany(Variants);

Product.sync()
  .then(() => {
    console.log("Product Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

Variants.sync()
  .then(() => {
    console.log("Variants Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export { Product, Variants };

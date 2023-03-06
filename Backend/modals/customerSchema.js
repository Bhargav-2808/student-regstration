import user from "../db/db.js";
import { DataTypes } from "sequelize";

const Customer = user.define("customer", {
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  add1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  add2: {
    type: DataTypes.TEXT,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Customer.sync()
  .then(() => {
    console.log("Customer Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export default Customer;

// const demp = () =>{
//     console.log("callback created");
// }

// const demp2 = (callback) =>{
//     callback();
// }

// demp2(demp);

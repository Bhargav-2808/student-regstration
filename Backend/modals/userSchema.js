import user from "../db/db.js";
import { DataTypes } from "sequelize";

const User = user.define("user", {
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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull:true
  },
});

User.sync()
  .then(() => {
    console.log("User Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export default User;

// const demp = () =>{
//     console.log("callback created");
// }

// const demp2 = (callback) =>{
//     callback();
// }

// demp2(demp);

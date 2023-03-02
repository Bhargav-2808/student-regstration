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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminRead: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  adminWrite: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  productRead: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  productWrite: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  isSuperAdmin:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  pic: {
    type: DataTypes.STRING,
    allowNull:true
  }
});

User.sync()
  .then(() => {
    console.log("User Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export default User;

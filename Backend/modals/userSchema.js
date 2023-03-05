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
  isSuperAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

});

const Rules = user.define("rules", {
  ruleName: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
});

const Permission = user.define("permission", {
  permission: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

User.hasMany(Permission);
Rules.hasMany(Permission);

User.sync()
  .then(() => {
    console.log("User Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

Rules.sync()
  .then(() => {
    console.log("Rules Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

Permission.sync()
  .then(() => {
    console.log("Permission Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export { User,Rules,Permission };

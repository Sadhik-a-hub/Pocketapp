const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL);

// Import models
const mypocket_info = require("./userLogin")(sequelize, DataTypes);
const todo_tasks = require("./todoTasks")(sequelize, DataTypes);

// Define associations
mypocket_info.hasMany(todo_tasks, { foreignKey: "userId" });
todo_tasks.belongsTo(mypocket_info, { foreignKey: "userId" });

module.exports = { sequelize, mypocket_info, todo_tasks };

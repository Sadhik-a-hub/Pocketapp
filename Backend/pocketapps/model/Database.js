const { Sequelize, DataTypes } = require("sequelize");

//  Create DB connection
const sequelize = new Sequelize(
  "mysql://root:sadhik@localhost:3306/Employee_data"
);

const mypocket_info = require("./userLogin")(sequelize, DataTypes);
const todo_tasks = require("./todoTasks")(sequelize, DataTypes);


mypocket_info.hasMany(todo_tasks, { foreignKey: "userId" });
todo_tasks.belongsTo(mypocket_info, { foreignKey: "userId" });

module.exports = { sequelize, mypocket_info, todo_tasks };

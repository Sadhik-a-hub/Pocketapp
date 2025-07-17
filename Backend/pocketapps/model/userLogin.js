
module.exports = (sequelize, DataTypes) => {
  const userLogin = sequelize.define(
    "mypocket_info",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      fullname: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      aadhaarPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      timestamps: false,
    }
  );

  return userLogin;
};

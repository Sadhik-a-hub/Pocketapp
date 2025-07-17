require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");

const { sequelize } = require("./model/index");

const app = express();



sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch((err) => console.error("❌ Database connection failed:", err));

sequelize
  .sync({ alter: true }) 
  .then(() => console.log("✅ Database tables synced"))
  .catch((err) => console.error("❌ Sync error:", err));



app.use(express.json());

require("./config/Passport");
app.use(passport.initialize());


app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mypocketRouter = require("./routes/User.routes");
const todoRouter = require("./routes/todo.routes");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/mypocket", mypocketRouter); 
app.use("/api/todos", todoRouter); 


app.use((req, res, next) => {
  next(createError(404, "❌ Endpoint not found"));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (req.originalUrl.startsWith("/api")) {
   
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    });
  }


  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

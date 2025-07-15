const express = require("express");
const router = express.Router();
const passport = require("passport");
const todoController = require('../controller/todotask.controller')
console.log(" todo.routes.js loaded");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  todoController.createTask
);


router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  todoController.getTasks
);


router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  todoController.deleteTask
);


router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  todoController.updateTask
);

module.exports = router;
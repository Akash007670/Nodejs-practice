const express = require("express");
const path = require("path");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getSpecificEmployee,
} = require("../../controllers/employeeController");

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getSpecificEmployee);

module.exports = router;

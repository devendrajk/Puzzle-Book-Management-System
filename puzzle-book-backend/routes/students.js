const express = require("express");

const router = express.Router();

const {
    searchStudents
} = require("../controllers/studentController");

const verifyToken = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

router.get(
    "/",
    // verifyToken,
    // allowRoles("Admin", "School", "Sales Executive"),
    searchStudents
);
module.exports = router;
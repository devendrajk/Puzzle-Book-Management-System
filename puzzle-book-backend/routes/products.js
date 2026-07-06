const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productController");

const verifyToken = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

router.get(
    "/",
    // verifyToken,
    // allowRoles("Admin"),
     getProducts
);
module.exports = router;
const express = require("express");

const router = express.Router();

const {
  createOrder,
} = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderListController");


const verifyToken = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

router.post(
    "/",
    // verifyToken,
    // allowRoles("Admin", "School", "Parent"),
     createOrder
);
router.post("/", createOrder);
router.get("/", getOrders);

module.exports = router;
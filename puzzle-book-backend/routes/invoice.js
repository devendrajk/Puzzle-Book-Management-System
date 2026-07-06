const express = require("express");

const router = express.Router();

const {
    generateInvoice
} = require("../controllers/invoiceController");

router.get(
    "/:orderId",
    generateInvoice
);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
    syncProducts
} = require("../controllers/productETLController");

router.get("/sync-products", syncProducts);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
    syncProducts,
    syncSchools
} = require("../controllers/snowflakeController");

router.get("/sync-products", syncProducts);
router.get("/sync-schools", syncSchools);

module.exports = router;
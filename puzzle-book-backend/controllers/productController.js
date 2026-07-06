const redis = require("../config/redis");
const { getConnection } = require("../services/salesforceService");
const { getIO } = require("../socket");
const getProducts = async (req, res) => {
  
    try {

        const cached = await redis.get("products");

if (cached) {

    console.log("✅ Products from Redis");

    return res.json({

        success: true,

        total: JSON.parse(cached).length,

        records: JSON.parse(cached)

    });

}
    const conn = getConnection();

    const result = await conn.query(`
      SELECT
    Id,
    Name,
    Product_Name__c,
    Category__c,
    Price__c,
    Stock_Quantity__c,
    Description__c
FROM Puzzle_Book_Product__c
ORDER BY Product_Name__c
    `);

    const response = {
    success: true,
    total: result.totalSize,
    records: result.records,
};

await redis.set(
    "products",
    JSON.stringify(result.records),
    "EX",
    300
);

        console.log("✅ Products cached");

    res.json({
      success: true,
      total: result.totalSize,
      records: result.records,
    });
  } catch (error) {
    console.error(error);
    // getIO().emit("dashboardUpdated");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
};
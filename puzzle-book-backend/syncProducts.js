require("dotenv").config();

const { getConnection } = require("./services/salesforceService");
const { saveProducts } = require("./services/productETL");

async function syncProducts() {

    const conn = getConnection();

    const result = await conn.query(`
        SELECT
            Id,
            Product_Name__c,
            Category__c,
            Price__c,
            Stock_Quantity__c,
            Description__c
        FROM Puzzle_Book_Product__c
    `);

    await saveProducts(result.records);

    console.log("Done");
}

syncProducts();
const { getConnection } = require("../services/salesforceService");
const { saveProducts } = require("../services/productETL");
const { saveSchools } = require("../services/schoolETL");
const syncProducts = async (req, res) => {

    try {

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
            ORDER BY Product_Name__c
        `);

        await saveProducts(result.records);

        res.json({
            success: true,
            total: result.records.length,
            message: "Products Synced Successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
const syncSchools = async (req, res) => {

    try {

        const conn = getConnection();

        const result = await conn.query(`
            SELECT
                Id,
                Name,
                BillingCity,
                BillingState
            FROM Account
            ORDER BY Name
        `);

        await saveSchools(result.records);

        res.json({
            success: true,
            total: result.records.length,
            message: "Schools Synced Successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
module.exports = {
    syncProducts,syncSchools
};
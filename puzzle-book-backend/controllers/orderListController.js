const { getConnection } = require("../services/salesforceService");

const getOrders = async (req, res) => {

    try {

        const conn = getConnection();

        const result = await conn.query(`
            SELECT
                Id,
                Name,
                Order_Number__c,
                Status__c,
                Total_Amount__c
            FROM Student_Order__c
            ORDER BY CreatedDate DESC
        `);

        res.json({

            success: true,

            total: result.totalSize,

            records: result.records

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    getOrders

};
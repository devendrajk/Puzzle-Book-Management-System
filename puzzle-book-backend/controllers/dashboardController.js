const { getConnection } = require("../services/salesforceService");

const getDashboard = async (req, res) => {

    try {

        const conn = getConnection();

        const products = await conn.query(
            "SELECT count() FROM Puzzle_Book_Product__c"
        );

        const students = await conn.query(
            "SELECT count() FROM Contact"
        );

        const orders = await conn.query(
            "SELECT count() FROM Student_Order__c"
        );

        const payments = await conn.query(
            "SELECT count() FROM Payment__c"
        );

        res.json({

            success: true,

            dashboard: {

                products: products.totalSize,

                students: students.totalSize,

                orders: orders.totalSize,

                payments: payments.totalSize

            }

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    getDashboard

};
const { getConnection } = require("../services/salesforceService");

const searchStudents = async (req, res) => {

    try {

        const conn = getConnection();

        const keyword = req.query.keyword || "";

        const result = await conn.query(`
            SELECT Id,
                   Name,
                   Account.Name
            FROM Contact
            WHERE Name LIKE '%${keyword}%'
            ORDER BY Name
            LIMIT 20
        `);

        res.json({
            success: true,
            total: result.totalSize,
            records: result.records
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
    searchStudents
};
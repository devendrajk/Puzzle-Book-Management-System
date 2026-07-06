require("dotenv").config();
const { execute } = require("./services/snowflakeService");

(async () => {

    try {

        await execute(`
            INSERT INTO FACT_ORDER
            (
                ORDER_ID,
                STUDENT_ID,
                PRODUCT_ID,
                QUANTITY,
                TOTAL_AMOUNT,
                ORDER_DATE
            )
            VALUES
            (
                'TEST001',
                'STU001',
                'PROD001',
                1,
                100,
                CURRENT_TIMESTAMP()
            )
        `);

        console.log("✅ Insert Success");

    } catch (err) {

        console.error(err);

    }

})();
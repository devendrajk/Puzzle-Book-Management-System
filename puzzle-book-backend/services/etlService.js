const { execute } = require("./snowflakeService");

async function saveOrderAnalytics(order) {

    try {

        await execute(

            `
            INSERT INTO FACT_ORDER
            (
                ORDER_ID,
    STUDENT_ID,
    STUDENT_NAME,
    PRODUCT_ID,
    PRODUCT_NAME,
    QUANTITY,
    TOTAL_AMOUNT,
    ORDER_DATE
            )
VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())            `,

            [
                order.orderId,
                order.studentId,
                order.studentName,
                order.productId,
                order.productName,
                order.quantity,
                order.total
            ]

        );

        console.log("✅ Order Analytics Saved to Snowflake");

    } catch (err) {

        console.error("❌ Snowflake Insert Error");
        console.error(err);

    }

}

module.exports = {

    saveOrderAnalytics

};
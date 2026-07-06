const { execute } = require("./snowflakeService");

async function savePaymentAnalytics(payment) {

    const sql = `
    INSERT INTO FACT_PAYMENT
    (
        PAYMENT_ID,
        ORDER_ID,
        STUDENT_NAME,
        PRODUCT_NAME,
        AMOUNT,
        STATUS,
        PAYMENT_DATE
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const binds = [
        payment.paymentId,
        payment.orderId,
        payment.studentName,
        payment.productName,
        payment.amount,
        payment.status,
        payment.paymentDate
    ];

    console.log("SQL:");
    console.log(sql);

    console.log("BINDS:");
    console.log(binds);

    await execute(sql, binds);

    console.log("Inserted Payment:", payment.paymentId);
}

module.exports = { savePaymentAnalytics };
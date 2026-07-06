const { Worker } = require("bullmq");

const redis = require("../config/redis");

const { sendEmail } = require("../services/emailService");
const { saveAuditLog } = require("../services/auditService");
const { saveOrderAnalytics } = require("../services/etlService");
const { savePaymentAnalytics } = require("../services/paymentETL");


new Worker(

    "orderQueue",

    async (job) => {


        // ===========================
        // PAYMENT JOB
        // ===========================
        if (job.name === "createPayment") {

            console.log("=================================");
            console.log("Processing Payment Job");
            console.log(job.data);
            console.log("=================================");

            await savePaymentAnalytics({

    paymentId: job.data.paymentId,
    orderId: job.data.orderId,
    studentName: job.data.studentName,
    productName: job.data.productName,
    amount: job.data.amount,
    status: job.data.status,
    paymentDate: job.data.paymentDate

});

            console.log("✅ FACT_PAYMENT Saved");

            return;
        }

        console.log("=================================");
        console.log("Processing Order Job");
        console.log(job.data);
        console.log("=================================");

        const {

    orderId,

    studentId,

    productId,

    studentName,

    studentEmail,

    productName,

    quantity,

    unitPrice,

    totalAmount

} = job.data;

        // ===========================
        // Save Audit Log
        // ===========================

        await saveAuditLog(

            studentName,

            "CREATE",

            "Student_Order__c",

            orderId,

            {

                student: studentName,

                product: productName,

                quantity,

                amount: totalAmount

            }

        );

        console.log("Audit Log Saved");

        // ===========================
        // Send Email
        // ===========================

        if (studentEmail) {

            await sendEmail(

                studentEmail,

                "Puzzle Book Order Confirmation",

                `
                <h2>📚 Puzzle Book Management</h2>

                <p>Hello <b>${studentName}</b>,</p>

                <p>Your order has been placed successfully.</p>

                <hr>

                <p><b>Order ID :</b> ${orderId}</p>

                <p><b>Product :</b> ${productName}</p>

                <p><b>Quantity :</b> ${quantity}</p>

                <p><b>Unit Price :</b> ₹${unitPrice}</p>

                <p><b>Total Amount :</b> ₹${totalAmount}</p>

                <p><b>Status :</b> Draft</p>

                <hr>

                <p>Thank you for purchasing from Puzzle Book Management.</p>

                `

            );

            console.log("Email Sent");

        }

        else {

            console.log("Student Email Not Found");

        }
        // ===========================
        // Save to Snowflake
        // ===========================

        try {

    console.log("🚀 Starting Snowflake ETL...");
    console.log({
        orderId,
        studentId,
        productId,
        quantity,
        totalAmount
    });

    await saveOrderAnalytics({

    orderId,

    studentId,

    studentName,

    productId,

    productName,

    quantity,

    total: totalAmount

});

    console.log("✅ Snowflake Analytics Saved");

} catch (err) {

    console.error("❌ Snowflake Error:");
    console.error(err);

}

        // console.log("✅ Snowflake Analytics Saved");
        // console.log("Job Completed");

    },

    {

        connection: redis

    }

);
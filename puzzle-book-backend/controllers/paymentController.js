const { getConnection } = require("../services/salesforceService");
const { getIO } = require("../socket");
const orderQueue = require("../queues/orderQueue");
const createPayment = async (req, res) => {

    try {

        const {

            orderId,
            amount,
            paymentMode

        } = req.body;

        const conn = getConnection();

// =========================
// Get Order
// =========================
const order = await conn
    .sobject("Student_Order__c")
    .retrieve(orderId);

// =========================
// Get Student
// =========================
const student = await conn
    .sobject("Contact")
    .retrieve(order.Contact__c);

// =========================
// Get Order Item
// =========================
const orderItem = await conn.query(`
    SELECT Puzzle_Book_Product__c
    FROM Order_Item__c
    WHERE Student_Order__c='${orderId}'
    LIMIT 1
`);

// =========================
// Get Product
// =========================
const product = await conn
    .sobject("Puzzle_Book_Product__c")
    .retrieve(
        orderItem.records[0].Puzzle_Book_Product__c
    );

// =========================
// Create Payment
// =========================
const payment = await conn
    .sobject("Payment__c")
    .create({

                Order__c: orderId,

                Amount__c: amount,

                Payment_Date__c: new Date()
                    .toISOString()
                    .split("T")[0],

                Payment_Mode__c: paymentMode,

                Status__c: "Paid"

            });
            await orderQueue.add(
    "createPayment",
    {
        paymentId: payment.id,
        orderId,
        studentName: student.Name,
        productName: product.Product_Name__c || product.Name,
        amount,
        status: "Paid",
        paymentDate: new Date().toISOString().split("T")[0]
    }
    
);
console.log("✅ Payment Job Added to Queue");
        getIO().emit("dashboardUpdated");

        res.json({

            success: true,

            paymentId: payment.id,

            message: "Payment Successful"

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

    createPayment

};
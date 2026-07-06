const { getConnection } = require("../services/salesforceService");
const { getIO } = require("../socket");
// const { sendEmail } = require("../services/emailService");
// const { saveAuditLog } = require("../services/auditService");
const orderQueue = require("../queues/orderQueue");
// const { saveOrderAnalytics } = require("../services/etlService");
const createOrder = async (req, res) => {

    console.log(req.headers);
    console.log(req.body);

    try {

        const { studentId, productId, quantity } = req.body;

        const conn = getConnection();

        // Get Product
        const product = await conn
            .sobject("Puzzle_Book_Product__c")
            .retrieve(productId);

        // Get Student
        const student = await conn
            .sobject("Contact")
            .retrieve(studentId);

        // Create Student Order
        const order = await conn
            .sobject("Student_Order__c")
            .create({

                Contact__c: studentId,

                School__c: student.AccountId,

                Order_Date__c: new Date().toISOString().split("T")[0],

                Status__c: "Draft",

                Total_Amount__c: product.Price__c * quantity

            });

        if (!order.success) {

            return res.status(400).json(order);

        }

        // Create Order Item
        const item = await conn
            .sobject("Order_Item__c")
            .create({

                Student_Order__c: order.id,

                Puzzle_Book_Product__c: productId,

                Quantity__c: quantity,

                Unit_Price__c: product.Price__c

            });

        // ==============================
        // SAVE AUDIT LOG TO POSTGRESQL
        // ==============================

//         await saveAuditLog(

//     student.Name,

//     "CREATE",

//     "Student_Order__c",

//     order.id,

//     {

//         student: student.Name,

//         product: product.Name,

//         quantity,

//         amount: product.Price__c * quantity

//     }

// );

//         // ==============================
//         // SEND EMAIL
//         // ==============================

//         if (student.Email) {

//             await sendEmail(

//                 student.Email,

//                 "Puzzle Book Order Confirmation",

//                 `
//                 <h2>📚 Puzzle Book Management</h2>

//                 <p>Hello <b>${student.Name}</b>,</p>

//                 <p>Your order has been placed successfully.</p>

//                 <hr>

//                 <p><b>Order ID :</b> ${order.id}</p>

//                 <p><b>Product :</b> ${product.Name}</p>

//                 <p><b>Quantity :</b> ${quantity}</p>

//                 <p><b>Unit Price :</b> ₹${product.Price__c}</p>

//                 <p><b>Total Amount :</b> ₹${product.Price__c * quantity}</p>

//                 <p><b>Status :</b> Draft</p>

//                 <hr>

//                 <p>Thank you for purchasing from Puzzle Book Management.</p>
//                 `
//             );

//             console.log("Order confirmation email sent.");
//         }
//         else {

//             console.log("Student email not available.");

//         }
await orderQueue.add(

    "createOrder",

    {

        orderId: order.id,

        studentId,

        studentName: student.Name,

        productId,

        productName: product.Product_Name__c,

        studentEmail: student.Email,

        quantity,

        unitPrice: product.Price__c,

        totalAmount: product.Price__c * quantity

    }

);

        // ==============================
        // REAL-TIME DASHBOARD UPDATE
        // ==============================

        getIO().emit("dashboardUpdated");

        res.json({

            success: true,

            orderId: order.id,

            itemId: item.id,

            message: "Order Created Successfully & Email Sent"

        });

    }
    catch (err) {

        console.error("========== ORDER ERROR ==========");
        console.error(err);

        if (err.data) {
            console.error(err.data);
        }

        if (err.errorCode) {
            console.error(err.errorCode);
        }

        if (err.message) {
            console.error(err.message);
        }

        res.status(500).json({

            success: false,

            error: err.data || err.message || err

        });

    }

};

module.exports = {

    createOrder

};
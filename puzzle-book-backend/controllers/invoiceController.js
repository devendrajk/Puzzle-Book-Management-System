const PDFDocument = require("pdfkit");

const generateInvoice = async (req, res) => {

    try {

        const { orderId } = req.params;

        // Replace these with Salesforce data later
        const invoice = {

    invoiceNo: "INV-2026-001",

    student: "Devendra",

    school: "ABC Public School",

    orderDate: new Date().toLocaleDateString(),

    items: [

        {
            product: "Brain Challenge",
            category: "Mathematics",
            quantity: 2,
            price: 320
        },

        {
            product: "GK World",
            category: "GK",
            quantity: 1,
            price: 250
        },

        {
            product: "Sudoku Beginner",
            category: "Sudoku",
            quantity: 3,
            price: 150
        },

        {
            product: "Colouring Cartoon",
            category: "Colouring",
            quantity: 2,
            price: 130
        },

        {
            product: "Dot-to-Dot Kids",
            category: "Dot-to-Dot",
            quantity: 1,
            price: 120
        }

    ]

};

        let total = 0;

        const doc = new PDFDocument({
            margin: 40
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Invoice-${orderId}.pdf`
        );

        doc.pipe(res);

        doc
            .fontSize(24)
            .text("Puzzle Book Management", {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(16);
        doc.text(`Invoice No : ${invoice.invoiceNo}`);
        doc.text(`Order ID : ${orderId}`);
        doc.text(`Student : ${invoice.student}`);
        doc.text(`School : ${invoice.school}`);
        doc.text(`Date : ${invoice.orderDate}`);

        doc.moveDown();

        doc.fontSize(18).text("Products");

        doc.moveDown();

        invoice.items.forEach(item => {

    const amount = item.quantity * item.price;

    total += amount;

    doc
        .fontSize(15)
        .text(`Product     : ${item.product}`);

    doc.text(`Category    : ${item.category}`);

    doc.text(`Quantity    : ${item.quantity}`);

    doc.text(`Unit Price  : ₹${item.price}`);

    doc.text(`Amount      : ₹${amount}`);

    doc.moveDown();

});

        doc.moveDown();

doc
    .fontSize(18)
    .text("--------------------------------");

doc
    .fontSize(18)
    .text(`Grand Total : ₹${total}`);

doc
    .fontSize(18)
    .text("--------------------------------");

doc.moveDown();

doc
    .fontSize(16)
    .text("Thank You for Purchasing!", {
        align: "center"
    });

doc
    .fontSize(12)
    .text("Puzzle Book Management System", {
        align: "center"
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
    generateInvoice
};
require("dotenv").config();

const transporter = require("./config/mail");

async function testMail() {

    try {
        console.log("HOST:", process.env.EMAIL_HOST);
        console.log("PORT:", process.env.EMAIL_PORT);
        console.log("USER:", process.env.EMAIL_USER);
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "devendra.bavisetti@ourjkglobal.com",

            subject: "Puzzle Book Test",

            html: "<h1>Hello Devendra 🚀</h1><p>Email working successfully.</p>"

        });

        console.log("SUCCESS");
        

    }

    catch (err) {

        console.log(err);

    }

}

testMail();
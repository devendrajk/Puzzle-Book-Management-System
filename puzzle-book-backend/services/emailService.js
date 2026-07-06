const transporter = require("../config/mail");

const sendEmail = async (to, subject, html) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to,

            subject,

            html

        });

        console.log("Email Sent Successfully");

    }

    catch (err) {

        console.error("❌ Email Sending Failed");
        console.error(err);

        throw err;

    }

};

module.exports = {

    sendEmail

};
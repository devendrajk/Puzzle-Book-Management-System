const jsforce = require("jsforce");

const oauth2 = new jsforce.OAuth2({
    loginUrl: process.env.SF_LOGIN_URL,
    clientId: process.env.SF_CLIENT_ID,
    // clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.SF_REDIRECT_URI
});

module.exports = oauth2;

// async function loginSalesforce() {
//     try {
//         await conn.login(
//             process.env.SF_USERNAME,
//             process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN
//         );

//         console.log("✅ Connected to Salesforce");
//     } catch (error) {
//         console.error("❌ Salesforce Login Failed");
//         console.error(error.message);
//     }
// }


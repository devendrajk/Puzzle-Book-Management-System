const { CometD } = require("cometd");
require("cometd-nodejs-client").adapt();

const { getConnection } = require("./salesforceService");

async function subscribePlatformEvents(io) {

    try {

        const conn = getConnection();

        const cometd = new CometD();

        cometd.configure({

            url: conn.instanceUrl + "/cometd/67.0",

            requestHeaders: {
                Authorization: "OAuth " + conn.accessToken
            },

            appendMessageTypeToURL: false

        });

        cometd.websocketEnabled = false;

        cometd.handshake((status) => {

            if (status.successful) {

                console.log("=================================");
                console.log("Salesforce Connected");
                console.log("=================================");

                cometd.subscribe(

                    "/event/Order_Created_Event__e",

                    (message) => {

                        console.log("=================================");
                        console.log("Platform Event Received");
                        console.log(message.data.payload);
                        console.log("=================================");

                        io.emit("dashboardUpdated", message.data.payload);

                    }

                );

            } else {

                console.log("Handshake Failed");

                console.log(status);

            }

        });

    } catch (err) {

        console.log(err);

    }

}

module.exports = {

    subscribePlatformEvents

};
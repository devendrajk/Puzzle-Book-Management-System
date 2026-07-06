const snowflake = require("snowflake-sdk");

const connection = snowflake.createConnection({

    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA

});

let connected = false;

function connect() {

    return new Promise((resolve, reject) => {

        if (connected) {

            return resolve(connection);

        }

        connection.connect((err) => {

            if (err) {

                return reject(err);

            }

            connected = true;

            console.log("✅ Connected to Snowflake");

            resolve(connection);

        });

    });

}

module.exports = {

    connection,

    connect

};
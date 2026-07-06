const { connection, connect } = require("../config/snowflake");

async function execute(sql, binds = []) {

    await connect();

    return new Promise((resolve, reject) => {

        connection.execute({

            sqlText: sql,

            binds,

            complete(err, stmt, rows) {

                if (err) {

                    return reject(err);

                }

                resolve(rows);

            }

        });

    });

}

module.exports = {

    execute

};
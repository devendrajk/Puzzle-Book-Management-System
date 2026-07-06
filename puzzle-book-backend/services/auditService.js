const pool = require("../config/postgres");

const saveAuditLog = async (

    userId,

    actionType,

    objectName,

    objectId,

    details

) => {

    try {

        await pool.query(

            `

            INSERT INTO audit_log

            (

                user_id,

                action_type,

                object_name,

                object_id,

                details

            )

            VALUES($1,$2,$3,$4,$5)

            `,

            [

                userId,

                actionType,

                objectName,

                objectId,

                JSON.stringify(details)

            ]

        );

        console.log("✅ Audit Log Saved");

    }

    catch(err){

        console.log(err);

    }

};

module.exports = {

    saveAuditLog

};
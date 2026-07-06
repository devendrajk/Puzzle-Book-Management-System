const { execute } = require("./snowflakeService");

async function saveSchools(schools) {

    await execute("TRUNCATE TABLE DIM_SCHOOL");

    for (const school of schools) {

        await execute(
            `
            INSERT INTO DIM_SCHOOL
            (
                SCHOOL_ID,
                SCHOOL_NAME,
                CITY,
                STATE
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                school.Id,
                school.Name,
                school.BillingCity,
                school.BillingState
            ]
        );

    }

    console.log("✅ DIM_SCHOOL Synced Successfully");

}

module.exports = {
    saveSchools
};
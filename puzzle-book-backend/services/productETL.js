const { execute } = require("./snowflakeService");

async function saveProducts(products) {

    // Clear old data
    await execute("TRUNCATE TABLE DIM_PRODUCT");

    // Insert all products
    for (const product of products) {

        await execute(
            `
            INSERT INTO DIM_PRODUCT
            (
                PRODUCT_ID,
                PRODUCT_NAME,
                CATEGORY,
                PRICE,
                STOCK,
                DESCRIPTION
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                product.Id,
                product.Product_Name__c || product.Name,
                product.Category__c,
                product.Price__c,
                product.Stock_Quantity__c,
                product.Description__c
            ]
        );
    }

    console.log("✅ DIM_PRODUCT Synced Successfully");
}

module.exports = {
    saveProducts
};
import React from "react";

function ProductCard({ product }) {
    return (
        <div className="col-md-4 mb-4">

            <div className="card shadow-sm h-100">

                <div className="card-body">

                    <h5>{product.Name}</h5>

                    <p>
                        Category :
                        <strong> {product.Category__c}</strong>
                    </p>

                    <p>
                        Price :
                        <strong> ₹{product.Price__c}</strong>
                    </p>

                    <p>
                        Stock :
                        <strong> {product.Stock_Quantity__c}</strong>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;
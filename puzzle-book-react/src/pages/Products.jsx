import { useEffect, useState } from "react";
import api from "../services/salesforceApi";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {

        try {

            const res = await api.get("/products");

            console.log("Products API");
            console.log(res.data);

            // Backend returns { success, total, records }
setProducts(res.data.records);
        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                📚 Puzzle Book Products
            </h2>

            <div className="row">
              
                {products.map(product => (

                    <div
                        className="col-md-4 mb-4"
                        key={product.Id}
                    >

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h4 className="card-title text-primary">

                                    {product.Product_Name__c || product.Name}

                                </h4>

                                <hr />

                                <p>

                                    <strong>Category :</strong>

                                    {" "}

                                    {product.Category__c}

                                </p>

                                <p>

                                    <strong>Price :</strong>

                                    ₹{product.Price__c}

                                </p>

                                <p>

                                    <strong>Stock :</strong>

                                    {product.Stock_Quantity__c}

                                </p>

                                <p>

                                    {product.Description__c}

                                </p>

                            </div>

                            <div className="card-footer bg-white">

                                <button className="btn btn-success w-100">

                                    Buy Now

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Products;
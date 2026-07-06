import { useEffect, useState } from "react";
import api from "../services/salesforceApi";

function OrderForm() {

    const [students, setStudents] = useState([]);
    const [products, setProducts] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);

    const [invoiceOrderId, setInvoiceOrderId] = useState("");

    useEffect(() => {

        loadStudents();
        loadProducts();

    }, []);

    async function loadStudents() {

        try {

            const response = await api.get("/students");

            setStudents(response.data.records);

        } catch (err) {

            console.error(err);

        }

    }

    async function loadProducts() {

        try {

            const response = await api.get("/products");

            if (
                response.data &&
                response.data.success &&
                Array.isArray(response.data.records)
            ) {

                setProducts(response.data.records);

            } else {

                setProducts([]);

            }

        } catch (err) {

            console.error(err);

            setProducts([]);

        }

    }

    function handleProductChange(e) {

        const id = e.target.value;

        setSelectedProduct(id);

        const product = products.find(p => p.Id === id);

        if (product) {

            setPrice(product.Price__c);

            setTotal(product.Price__c * quantity);

        }

    }

    function handleQuantityChange(e) {

        const qty = Number(e.target.value);

        setQuantity(qty);

        setTotal(price * qty);

    }

    async function submitOrder() {

        try {

            const body = {

                studentId: selectedStudent,
                productId: selectedProduct,
                quantity

            };

            const response = await api.post("/orders", body);

            alert(response.data.message || "Order Created Successfully");

            // Save Order ID
            setInvoiceOrderId(response.data.orderId);

            // Reset Form
            setSelectedStudent("");
            setSelectedProduct("");
            setQuantity(1);
            setPrice(0);
            setTotal(0);

            await loadProducts();

        }

        catch (err) {

            console.error(err);

            alert("Order Creation Failed");

        }

    }

    return (

        <div className="card p-4">

            <h3>Create Student Order</h3>

            <hr />

            <label>Student</label>

            <select
                className="form-select mb-3"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
            >

                <option value="">Select Student</option>

                {students.map(student => (

                    <option
                        key={student.Id}
                        value={student.Id}
                    >

                        {student.Name}

                    </option>

                ))}

            </select>

            <label>Product</label>

            <select
                className="form-select mb-3"
                value={selectedProduct}
                onChange={handleProductChange}
            >

                <option value="">Select Product</option>

                {products.map(product => (

                    <option
                        key={product.Id}
                        value={product.Id}
                    >

                        {product.Product_Name__c || product.Name}

                    </option>

                ))}

            </select>

            <label>Quantity</label>

            <input
                type="number"
                className="form-control mb-3"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
            />

            <h5>Unit Price : ₹{price}</h5>

            <h4>Total : ₹{total}</h4>

            <button
                className="btn btn-success mt-3"
                onClick={submitOrder}
            >
                Submit Order
            </button>

            {invoiceOrderId && (

                <button
                    className="btn btn-primary mt-3 ms-2"
                    onClick={() =>
                        window.open(
                            `http://localhost:5000/api/invoice/${invoiceOrderId}`,
                            "_blank"
                        )
                    }
                >
                    📄 Download Invoice
                </button>

            )}

        </div>

    );

}

export default OrderForm;
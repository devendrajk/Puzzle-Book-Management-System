import { useEffect, useState } from "react";
import api from "../services/salesforceApi";

function PaymentForm() {

    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMode, setPaymentMode] = useState("UPI");

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {

        try {

            const response = await api.get("/orders");

            console.log(response.data);

            setOrders(response.data.records);

        } catch (err) {

            console.error(err);

        }

    }

    async function makePayment() {

        if (!orderId) {
            alert("Please select an order.");
            return;
        }

        if (!amount) {
            alert("Please enter the amount.");
            return;
        }

        try {

            const body = {
                orderId,
                amount,
                paymentMode
            };

            const response = await api.post("/payments", body);

            alert(response.data.message);

            // Reset Form
            setOrderId("");
            setAmount("");
            setPaymentMode("UPI");

            // Reload Orders
            await loadOrders();

        } catch (err) {

            console.error(err);

            alert("Payment Failed");

        }

    }

    return (
        <div className="card p-4">

            <h3>Create Payment</h3>

            <hr />

            <label>Order</label>

            <select
                className="form-select mb-3"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            >

                <option value="">Select Order</option>

                {orders.map(order => (

                    <option
                        key={order.Id}
                        value={order.Id}
                    >
                        {order.Name}
                    </option>

                ))}

            </select>

            <label>Amount</label>

            <input
                type="number"
                className="form-control mb-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <label>Payment Mode</label>

            <select
                className="form-select mb-3"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
            >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
                <option value="Bank Transfer">Bank Transfer</option>
            </select>

            <button
                className="btn btn-success"
                onClick={makePayment}
            >
                Pay Now
            </button>

        </div>
    );
}

export default PaymentForm;
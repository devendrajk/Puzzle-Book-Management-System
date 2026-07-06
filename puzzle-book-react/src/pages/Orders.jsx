import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";

function Orders() {

    const [orderId, setOrderId] = useState("");

    return (
        <>
            <Navbar />

            <div className="d-flex">
                <Sidebar />

                <div className="container-fluid p-4">
                    <h2>Student Orders</h2>

                    <OrderForm setOrderId={setOrderId} />

                    {orderId && (
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() =>
                                window.open(
                                    `http://localhost:5000/api/invoice/${orderId}`
                                )
                            }
                        >
                            Download Invoice
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Orders;
import { useEffect, useState } from "react";
import api from "../services/salesforceApi";
import socket from "../services/socket";

function DashboardCards() {
    const [dashboard, setDashboard] = useState({
        products: 0,
        students: 0,
        orders: 0,
        payments: 0
    });

    // Load dashboard data
    const loadDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
console.log(response.data.dashboard);

console.log("Products:", response.data.dashboard.products);
console.log("Students:", response.data.dashboard.students);
console.log("Orders:", response.data.dashboard.orders);
console.log("Payments:", response.data.dashboard.payments);
            setDashboard(response.data.dashboard);
            console.log("State will become:", response.data.dashboard);
        } catch (error) {
            console.error("Dashboard Error:", error);
        }
    };

    useEffect(() => {
        loadDashboard();

        socket.on("dashboardUpdated", () => {
            console.log("Dashboard Updated");
            loadDashboard();
        });

        return () => {
            socket.off("dashboardUpdated");
        };
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card bg-primary text-white mb-3">
                    <div className="card-body">
                        <h5>Total Products</h5>
                        <h2>{dashboard.products}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-success text-white mb-3">
                    <div className="card-body">
                        <h5>Total Students</h5>
                        <h2>{dashboard.students}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-warning text-dark mb-3">
                    <div className="card-body">
                        <h5>Total Orders</h5>
                        <h2>{dashboard.orders}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-danger text-white mb-3">
                    <div className="card-body">
                        <h5>Total Payments</h5>
                        <h2>{dashboard.payments}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCards;
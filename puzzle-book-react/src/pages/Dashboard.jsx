import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {

    return (

        <>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2>Dashboard</h2>

                    <DashboardCards />

                </div>

            </div>

        </>

    );

}

export default Dashboard;
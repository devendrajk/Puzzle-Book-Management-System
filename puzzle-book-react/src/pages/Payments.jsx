import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PaymentForm from "../components/PaymentTable";

function Payments() {

    return (

        <>

            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2>Payments</h2>

                    <PaymentForm />

                </div>

            </div>

        </>

    );

}

export default Payments;
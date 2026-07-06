import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                minHeight: "100vh",
                width: "250px"
            }}
        >

            <h4 className="mb-4">

                Menu

            </h4>

            <ul className="nav flex-column">

                <li className="nav-item mb-3">

                    <Link
                        to="/dashboard"
                        className="nav-link text-white"
                    >
                        Dashboard
                    </Link>

                </li>

                <li className="nav-item mb-3">

                    <Link
                        to="/products"
                        className="nav-link text-white"
                    >
                        Products
                    </Link>

                </li>

                <li className="nav-item mb-3">

                    <Link
                        to="/orders"
                        className="nav-link text-white"
                    >
                        Orders
                    </Link>

                </li>

                <li className="nav-item mb-3">

                    <Link
                        to="/payments"
                        className="nav-link text-white"
                    >
                        Payments
                    </Link>

                </li>

            </ul>
            <li className="nav-item">
            <Link className="nav-link text-white" to="/upload">
            Upload
            </Link>
            </li>
        </div>
        

    );

}

export default Sidebar;
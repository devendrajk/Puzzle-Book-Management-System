import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import FileUploadPage from "./pages/FileUploadPage";
function App() {

    return (

        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/products" element={<Products />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/payments" element={<Payments />} />

            <Route
    path="/upload"
    element={<FileUploadPage />}
/>

        </Routes>

    );

}

export default App;
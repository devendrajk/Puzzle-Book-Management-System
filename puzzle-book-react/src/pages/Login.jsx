import { useState } from "react";
import api from "../services/salesforceApi";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {

            const response = await api.post("/auth/login", {

                username,

                password

            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (err) {

            alert("Invalid Username or Password");

            console.error(err);

        }

    }

    return (

        <div className="container mt-5">

            <h2>Login</h2>

            <input
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>

        </div>

    );

}

export default Login;
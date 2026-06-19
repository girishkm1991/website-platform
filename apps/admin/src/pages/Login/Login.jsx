import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login: saveLogin } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await login({
                email,
                password
            });

            saveLogin(
                response.user,
                response.token
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login failed"
            );

        }

        setLoading(false);

    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fa"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    width: "400px",
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0 5px 20px rgba(0,0,0,.15)"
                }}
            >

                <h1>Website Platform</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={{
                        width: "100%",
                        marginBottom: "15px",
                        padding: "10px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        marginBottom: "15px",
                        padding: "10px"
                    }}
                />

                {

                    error &&

                    <p
                        style={{
                            color: "red"
                        }}
                    >

                        {error}

                    </p>

                }

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px"
                    }}
                >

                    {

                        loading
                        ? "Logging in..."
                        : "Login"

                    }

                </button>

            </form>

        </div>

    );

}

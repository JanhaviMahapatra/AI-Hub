import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Login.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(form.email, form.password);

            const redirectRoute =
                sessionStorage.getItem("redirectRoute");

            if (redirectRoute) {
                sessionStorage.removeItem("redirectRoute");
                navigate(redirectRoute);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

return (
    <div className="form-container-wrapper">
        <form onSubmit={handleSubmit} className="nexus-glass-form">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Enter your credentials to access your workshop</p>

            <div className="input-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    className="nexus-input"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    className="nexus-input"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                />
            </div>

            <button type="submit" className="nexus-submit-btn">
                Login
            </button>
        </form>
    </div>
);
}
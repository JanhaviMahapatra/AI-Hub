import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Register.css";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(
                form.name,
                form.email,
                form.password
            );

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
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Get started with your developer sandbox access</p>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    className="nexus-input"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />
            </div>

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
                Register
            </button>
        </form>
    </div>
);
}
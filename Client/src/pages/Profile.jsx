import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Profile.css";

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

   return (
    <div className="profile-page">
        <div className="bg-orb orb-left"></div>
        <div className="bg-orb orb-right"></div>

        <div className="profile-container">

            <div className="profile-header">

                <div className="badge">
                    <span>👤</span>
                    Personal Account
                </div>

                <h1>
                    My <span>Profile</span>
                </h1>

                <p>
                    View your account information and securely manage your
                    NexusAI account.
                </p>

            </div>

            <div className="profile-card">

                <div className="avatar">
                    {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                </div>

                <div className="profile-info">

                    <div className="info-box">
                        <span className="label">
                            Full Name
                        </span>

                        <h3>
                            {user?.name || "N/A"}
                        </h3>
                    </div>

                    <div className="info-box">
                        <span className="label">
                            Email Address
                        </span>

                        <h3>
                            {user?.email || "N/A"}
                        </h3>
                    </div>

                </div>

            </div>

            <div className="logout-section">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    </div>
); 
}
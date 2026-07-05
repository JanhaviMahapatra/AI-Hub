import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

 return (
    <nav className="nexus-global-navbar">
        <div className="nexus-nav-inner">
            <Link to="/" className="nexus-nav-logo">
                AI-Hub
            </Link>

            {user ? (
                <div className="nexus-nav-user-actions">
                    <span className="nexus-nav-welcome">
                        Welcome, <strong className="user-highlight">{user.name}</strong>
                    </span>

                    <Link to="/profile" className="nexus-nav-profile-link" title="View Profile">
                        <span className="material-symbols-outlined nav-icon"></span>
                        <span>Profile</span>
                    </Link>

                    <button onClick={handleLogout} className="nexus-nav-logout-btn">
                        <span className="material-symbols-outlined nav-icon"></span>
                        <span>Logout</span>
                    </button>
                </div>
            ) : (
                <div className="nexus-nav-guest-actions">
                    <Link to="/login" className="nexus-nav-link-secondary">
                        Login
                    </Link>

                    <Link to="/register" className="nexus-nav-link-primary">
                        Register
                    </Link>
                </div>
            )}
        </div>
    </nav>
); 
    
}

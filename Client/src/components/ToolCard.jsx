import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/ToolCard.css";

const ToolCard = ({ tool }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleClick = () => {
        if (!user) {
            sessionStorage.setItem(
                "redirectRoute",
                tool.route
            );

            navigate("/login");
            return;
        }

        navigate(tool.route);
    };

    return (
    <div onClick={handleClick} className="nexus-tool-card tool-card-hover">
        <div className="nexus-card-meta">
            <h3 className="nexus-card-title">{tool.title}</h3>
            <p className="nexus-card-desc">{tool.description}</p>
        </div>
        
        <div className="nexus-card-footer">
            <button className="nexus-card-action-btn">
                Launch 
                <span className="material-symbols-outlined action-arrow"></span>
            </button>
        </div>
    </div>
);
};

export default ToolCard;
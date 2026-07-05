import { useEffect } from "react";
import api from "../services/api";
import tools from "../data/tools";
import ToolCard from "../components/ToolCard";
import Navbar from "../components/Navbar";
import "../style/Home.css";

export default function Home() {
    useEffect(() => {
        const checkServer = async () => {
            try {
                const res = await api.get("/health");
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        checkServer();
    }, []);

    return (
    <>
        <Navbar />

        <div className="nexus-workshop-grid">
            <div className="nexus-ambient-glow nexus-glow-left"></div>
            <div className="nexus-ambient-glow nexus-glow-right"></div>

            {tools.map((tool) => (
                <ToolCard
                    key={tool.id}
                    tool={tool}
                />
            ))}
        </div>
    </>
);
}
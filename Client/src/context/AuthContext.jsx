import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const login = async (email, password) => {
const { data } = await api.post("/auth/login", {
email,
password,
});

localStorage.setItem("token", data.token);
setUser(data.user);
};

const register = async (name, email, password) => {
const { data } = await api.post("/auth/register", {
name,
email,
password,
});

localStorage.setItem("token", data.token);
setUser(data.user);
};

const logout = () => {
localStorage.removeItem("token");
setUser(null);
};

const fetchProfile = async () => {
try {
const { data } = await api.get("/auth/profile");
setUser(data.user);
} catch {
localStorage.removeItem("token");
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchProfile();
}, []);

return (
<AuthContext.Provider value={{
    user,
    loading,
    login,
    register,
    logout,
}}>
{children}
</AuthContext.Provider>
);
};
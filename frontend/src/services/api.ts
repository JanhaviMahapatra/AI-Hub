import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-hub-t4ed.onrender.com/api",
});

export default API;


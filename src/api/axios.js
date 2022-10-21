import axios from "axios";

export default axios.create({
  baseURL: "https://secret-app-backend.vercel.app",
});

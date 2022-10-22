import axios from "axios";

export default axios.create({
  baseURL: "https://secret-api.vercel.app",
});

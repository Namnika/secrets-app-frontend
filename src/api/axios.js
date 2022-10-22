import axios from "axios";

export default axios.create({
  baseURL: "https://secrets-app-api.vercel.app",
});

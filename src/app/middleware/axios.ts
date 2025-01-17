import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set Authorization header secara dinamis berdasarkan token di cookies
const token = Cookies.get("auth_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.defaults.withCredentials = true;

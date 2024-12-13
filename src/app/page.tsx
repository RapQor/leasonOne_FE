"use client";

import { useState } from "react";
import { api } from "./middleware/axios"; // Pastikan file axios telah dikonfigurasi
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  username: string;
  age: number;
  password: string;
  message: string;
  token: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Tipe data User atau null
  const [allUsers, setAllUsers] = useState<User[]>([]); // Array tipe User

  const getCurrentUser = async () => {
    try {
      const response = await api.get<User>("/api/current-user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      console.log("token: ", api.defaults.headers.common["Authorization"]);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.get<User[]>("/api/all-users");
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const logout = async () => {
    try {
      // Mengirimkan request POST ke endpoint logout
      // Menghapus token dari cookies
      Cookies.remove("auth_token");

      // Menghapus token dari headers Axios instance
      delete api.defaults.headers.common["Authorization"];

      const response = await api.post("/api/logout");

      // Menangani response logout
      console.log(response.data.message); // "Logout successful"

      // Mengarahkan ulang pengguna setelah logout, jika perlu
      window.location.href = "/auth/login"; // Contoh redirect ke halaman login
    } catch (error: any) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {user ? <h1>WELCOME, {user.name}</h1> : <h1>WELCOME</h1>}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={getCurrentUser}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Current User
        </button>

        <button
          onClick={fetchAllUsers}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fetch All Users
        </button>

        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Menampilkan data pengguna saat ini */}
      {user && (
        <div style={{ marginTop: "20px" }}>
          <h2>Current User Profile</h2>
          <pre
            style={{
              backgroundColor: "#f2f2f2",
              padding: "10px",
              color: "black",
            }}
          >
            <p>Nama: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
            <p>{user.message}</p>
          </pre>
        </div>
      )}

      {/* Menampilkan semua pengguna */}
      {allUsers.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>All Users</h2>
          <ul>
            {allUsers.map((user) => (
              <li key={user.id}>
                {user.name} (Username: {user.username}) - Age: {user.age}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

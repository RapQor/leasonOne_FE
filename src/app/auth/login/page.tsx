"use client";
import { api } from "@/app/middleware/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const goToRegister = () => {
    router.push("/auth/register");
  };

  const loginHandler = async () => {
    try {
      const response = await api.post("/api/login", {
        username: username,
        password: password,
      });

      // Simpan token yang diterima dari response ke cookies
      const token = response.data.token; // Pastikan token ada dalam response
      Cookies.set("auth_token", token, { expires: 7 }); // Simpan token dalam cookies

      // Set token ke header Authorization secara manual
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.push("/"); // Redirect ke halaman utama
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "#f2f2f2",
          height: "50vh",
          width: "50vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>
          Login
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "300px",
                height: "30px",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                padding: "10px",
                color: "black",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "300px",
                height: "30px",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                padding: "10px",
                color: "black",
              }}
            />
          </div>
          <button
            type="submit"
            onClick={loginHandler}
            style={{
              color: "white",
              backgroundColor: "green",
              width: "100%",
              height: "30px",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Enter
          </button>
        </div>

        <button
          type="button"
          onClick={goToRegister}
          style={{
            color: "black",
            backgroundColor: "yellow",
            width: "100px",
            height: "30px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

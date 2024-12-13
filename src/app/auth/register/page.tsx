"use client";
import { api } from "@/app/middleware/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const goToLogin = () => {
    router.push("/auth/login");
  };

  const registerHandler = async () => {
    await api.post("/api/register", {
      Name: name,
      Age: Number(age),
      Username: username,
      Password: password,
    });

    router.push("/auth/login");
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
        }}
      >
        <h1 style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>
          Register
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
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
              type="text"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
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
            onClick={registerHandler}
            style={{
              color: "white",
              backgroundColor: "green",
              width: "100%",
              height: "30px",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "10px",
            }}
          >
            Enter
          </button>
        </div>
        <button
          type="button"
          onClick={goToLogin}
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
          Login
        </button>
      </div>
    </div>
  );
}

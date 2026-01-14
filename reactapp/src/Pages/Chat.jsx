import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Chat() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [showTestMessage, setShowTestMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSearch = (value) => {
    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search: value,
        currentUser: currentUser.username,
      }),
    }).then(async (res) => {
      const data = await res.json();
      setUsers(data.users || []);
    });
  };

  useEffect(() => {
    handleSearch("");

    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to right, #fecaca, #fed7aa)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isMobileView ? "100%" : "24rem",
          backgroundColor: "rgba(255,255,255,0.6)",
          borderRight: isMobileView ? "none" : "1px solid rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "22px" }}>
            Your chats,
            <span style={{ color: "gray" }}> {currentUser?.username}</span>
          </h1>

          {!isMobileView && (
            <div>
              <Button
                variant="outlined"
                onClick={() => setShowTestMessage(true)}
                style={{ marginRight: "10px", color: "gray", borderColor: "gray" }}
              >
                Others
              </Button>

              <Button
                variant="outlined"
                style={{ color: "gray", borderColor: "gray" }}
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          )}

          {isMobileView && (
            <Button
              variant="outlined"
              style={{ color: "gray", borderColor: "gray" }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              ☰
            </Button>
          )}
        </div>

        <TextField
          label="Search"
          variant="outlined"
          style={{ width: "80%", marginBottom: "20px" }}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div style={{ width: "100%", overflowY: "auto" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                height: "80px",
                borderTop: "1px solid black",
                background:
                  "linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,165,0,0.2))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <span style={{ fontSize: "20px" }}>{user.username}</span>
              <Button variant="text" style={{ color: "gray" }}>
                Message
              </Button>
            </div>
          ))}
        </div>
      </div>

      {!isMobileView && showTestMessage && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              borderRadius: "16px",
              border: "1px solid black",
              fontSize: "24px",
            }}
          >
            TEST
          </div>
        </div>
      )}

      {isMobileView && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isMobileMenuOpen ? 0 : "-100%",
            width: "70%",
            height: "100vh",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "0 16px 16px 0",
            boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
            transition: "left 0.3s ease",
            zIndex: 2000,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            style={{ marginBottom: "10px", color: "gray", borderColor: "gray" }}
            onClick={() => {
              setShowTestMessage(true);
              setIsMobileMenuOpen(false);
            }}
          >
            Others
          </Button>

          <Button
            fullWidth
            variant="outlined"
            style={{ marginBottom: "10px", color: "gray", borderColor: "gray" }}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </Button>

          <Button
            fullWidth
            variant="outlined"
            style={{ color: "gray", borderColor: "gray" }}
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      )}

      {isMobileView && showTestMessage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
            fontSize: "24px",
          }}
        >
          TEST
        </div>
      )}
    </div>
  );
}

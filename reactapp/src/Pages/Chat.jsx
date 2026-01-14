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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: value,
        currentUser: currentUser.username,
      }),
    }).then(async (responseJSON) => {
      const response = await responseJSON.json();
      setUsers(response.users);
      console.log(response);
    });
  };

  const showTest = () => {
    setShowTestMessage(true);
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
    <div className="bg-linear-to-r from-red-200 to-orange-200 flex flex-row h-screen">
      <div className="bg-white/50 h-screen max-w-sm border-r flex flex-col items-center">
        <div
          style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl text-black mr-5">
            Your chats,
            <span className="text-gray-600"> {currentUser?.username}</span>
          </h1>

          {!isMobileView && (
            <div>
              <Button
                onClick={showTest}
                variant="outlined"
                style={{
                  color: "gray",
                  borderColor: "gray",
                  marginRight: "10px",
                }}
              >
                Others
              </Button>

              <Button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                variant="outlined"
                style={{ color: "gray", borderColor: "gray" }}
              >
                Logout
              </Button>
            </div>
          )}

          {isMobileView && (
            <Button
              variant="outlined"
              style={{ color: "gray", borderColor: "gray" }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </Button>
          )}

          {isMobileView && isMobileMenuOpen && (
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                style={{ color: "gray", borderColor: "gray" }}
                onClick={() => {
                  showTest();
                  setIsMobileMenuOpen(false);
                }}
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
        </div>

        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="max-w-62.5"
          style={{ marginBottom: "20px" }}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            handleSearch(value);
          }}
        />

        <div
          className="w-full overflow-auto mt-5 border-t"
          style={{ overscrollBehavior: "none" }}
        >
          {users.map((user) => {
            return (
              <div
                className="w-full h-20 border-t hover:brightness-90 cursor-pointer flex items-center justify-between"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 0, 0, 0.2), rgba(255, 165, 0, 0.2))",
                }}
              >
                <h1 className="ml-5 text-xl">{user.username}</h1>
                <Button
                  variant="text"
                  style={{ marginRight: "20px", color: "gray" }}
                >
                  Message
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showTestMessage && (
          <div
            style={{
              backgroundColor: "white",
              margin: "20px",
              padding: "50px",
              border: "1px solid black",
              borderRadius: "16px",
              minWidth: "30vh",
              minHeight: "20vh",
              maxWidth: "80vh",
              maxHeight: "60vh",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            TEST
          </div>
        )}

        {showTestMessage && (
          <div
            style={{
              position: isMobileView ? "fixed" : "relative",
              top: isMobileView ? 0 : "auto",
              left: isMobileView ? 0 : "auto",
              width: isMobileView ? "100vw" : "100%",
              height: isMobileView ? "100vh" : "100%",
              backgroundColor: "white",
              padding: "50px",
              border: "1px solid black",
              borderRadius: isMobileView ? "0px" : "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "500",
              zIndex: 1000,
            }}
          >
            TEST
          </div>
        )}
      </div>
    </div>
  );
}

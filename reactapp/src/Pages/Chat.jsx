import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Chat() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <div className="bg-linear-to-r from-red-200 to-orange-200 h-screen">
      <div className="bg-white/50 h-screen max-w-sm border-r flex flex-col items-center">
        <div className="flex flex-row mt-3 mb-3">
          <h1 className="text-2xl mt-5 mb-5 text-black mr-5">
            Your chats,
            <span className="text-gray-600"> {currentUser?.username}</span>
          </h1>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
            variant="outlined"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              color: "gray",
              borderColor: "gray",
            }}
          >
            Logout
          </Button>
        </div>

        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="max-w-62.5"
          style={{ marginBottom: "30px" }}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            handleSearch(value);
          }}
        />

        <Button style={{color: "gray", borderColor: "gray"}} variant="outlined" onClick={() => console.log("asdasd")}>Others</Button>

        <div
          className="w-full overflow-auto"
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

      <div>
        <h1>TEST</h1>
      </div>
    </div>
  );
}

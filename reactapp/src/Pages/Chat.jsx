import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Chat() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const handleSearch = (value) => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: value }),
    }).then(async (responseJSON) => {
      const response = await responseJSON.json();
      setUsers(response.users);
      console.log(response);
    });
  };

  return (
    <div className="bg-linear-to-r from-red-200 to-orange-200 h-screen">
      <div className="bg-white/50 h-screen max-w-sm border-r flex flex-col items-center">
        <div className="flex flex-row mt-3 mb-3">
          <h1 className="text-2xl mt-5 mb-5 text-black mr-5">Your chats</h1>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            style={{ marginTop: "10px", marginBottom: "10px" }}
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

        <div>
          {users.map((user) => {
            return (
              <div className="w-full h-20 bg-white/80 border-b border-t hover:bg-gray-200 cursor-pointer flex items-center overflow-auto">
                <h1 className="ml-5 text-2xl">{user.username}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

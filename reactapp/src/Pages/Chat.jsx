import React from "react";

import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Chat() {
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-r from-red-200 to-orange-200 h-screen">
      <div className="bg-white/50 h-screen max-w-sm border-r flex flex-col items-center">
        <h1 className="text-2xl mt-5 mb-5 text-black">Your chats</h1>
        <Button onClick={() => navigate("/")} variant="outlined">
          Back
        </Button>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="max-w-62.5"
        />
        <div className="mt-10 w-full h-20 bg-white border-b border-t hover:bg-gray-200 cursor-pointer"></div>
      </div>
    </div>
  );
}

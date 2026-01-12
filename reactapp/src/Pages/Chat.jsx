import React from "react";

import TextField from "@mui/material/TextField";

export default function Chat() {
  return (
    <div className="bg-linear-to-r from-red-200 to-orange-200 h-screen">
      <div className="bg-white/50 h-screen max-w-sm border-r flex flex-col items-center">
        <h1 className="text-2xl mt-5 mb-5 text-black">Your chats</h1>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className="max-w-62.5"
        />
      </div>
    </div>  
  );
}

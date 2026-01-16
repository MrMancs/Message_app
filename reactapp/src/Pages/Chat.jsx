import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Chat({ setToastData }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [showOtherUsers, setshowOtherUsers] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [friendRequests, setFriendRequests] = useState(false);
  const [friendRequestUsers, setFriendRequestUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [messageWindows, setMessageWindows] = useState(false);

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

  const fetchFriends = () => {
    fetch("/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterName: currentUser.username,
        receiverName: currentUser.username,
      }),
    }).then(async (res) => {
      const data = await res.json();

      if (!Array.isArray(data.acceptedFriends)) {
        setFriends([]);
        return;
      }

      const acceptedFriends = data.acceptedFriends.map((row) =>
        row.requester_name === currentUser.username
          ? row.receiver_name
          : row.requester_name
      );

      setFriends(acceptedFriends);
    });
  };

  const addFriend = (username) => {
    fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterName: currentUser.username,
        receiverName: username,
        status: "pending",
      }),
    }).then(async (res) => {
      const data = await res.json();

      setToastData({
        open: true,
        message:
          data.status === 200
            ? "Friend request sent!"
            : "Error while adding friend",
        severity: data.status === 200 ? "success" : "error",
      });

      if (data.status === 200) {
        setPendingRequests((prev) => [...prev, username]);
      }
    });
  };

  const denyFriendRequest = (requesterName) => {
    fetch("/api/denyfriendrequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterName,
        receiverName: currentUser.username,
        status: "denied",
      }),
    }).then(() => {
      deleteFriendRequest(requesterName);

      setPendingRequests((prev) =>
        prev.filter((name) => name !== requesterName)
      );
    });
  };

  const acceptFriendRequest = (requesterName) => {
    fetch("/api/acceptfriendrequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterName,
        receiverName: currentUser.username,
        status: "accepted",
      }),
    }).then(async (res) => {
      const data = await res.json();

      if (data.status === 200) {
        setToastData({
          open: true,
          message: "Friend request accepted",
          severity: "success",
        });

        deleteFriendRequest(requesterName);
        fetchFriends();
      }

      setPendingRequests((prev) =>
        prev.filter((name) => name !== requesterName)
      );
    });
  };

  const deleteFriendRequest = (requesterName) => {
    setFriendRequestUsers((prev) => {
      const updated = prev.filter((name) => name !== requesterName);
      setFriendRequests(updated.length > 0);
      return updated;
    });
  };

  const isFriend = (username) => friends.includes(username);

  const isPending = (username) => pendingRequests.includes(username);

  const showMessageWindow = (friendUsername) => {};

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    fetch("/api/friendrequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentUser: currentUser.username,
      }),
    }).then(async (res) => {
      const data = await res.json();
      setFriendRequests(data.requester.length > 0);
      setFriendRequestUsers(data.requester || []);
    });

    fetchFriends();

    const fetchPendingRequests = () => {
      fetch("/api/sentfriendrequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: currentUser.username,
        }),
      }).then(async (res) => {
        const data = await res.json();
        setPendingRequests(data.pending || []);
      });
    };

    fetchPendingRequests();

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
          borderRight: isMobileView ? "none" : "1px solid black",
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
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>
            Your chats,
            <span style={{ color: "gray" }}> {currentUser?.username}</span>
          </h1>

          {!isMobileView && (
            <div className="flex">
              <Button
                variant="outlined"
                onClick={() => {
                  setshowOtherUsers(true);
                  handleSearch("");
                }}
                style={{
                  marginRight: "10px",
                  color: "gray",
                  borderColor: "gray",
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

          {isMobileView && (
            <Button
              variant="outlined"
              style={{ color: "gray", borderColor: "gray" }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              ☰
            </Button>
          )}

          {friendRequests && (
            <div
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                overscrollBehavior: "none",
                marginTop: "20px",
                width: "100%",
              }}
            >
              {friendRequestUsers.map((username, index) => (
                <div
                  key={index}
                  style={{
                    marginTop: "10px",
                    padding: "5px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className="mb-2.5">
                    Friend request from: {username}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "red",
                        height: "40px",
                        color: "white",
                        borderColor: "red",
                      }}
                      onClick={() => {
                        denyFriendRequest(username);
                        deleteFriendRequest(username);
                      }}
                    >
                      X
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "green",
                        height: "40px",
                        color: "white",
                        borderColor: "green",
                      }}
                      onClick={() => {
                        acceptFriendRequest(username);
                        deleteFriendRequest(username);

                        fetchFriends(currentUser.username);
                      }}
                    >
                      ✓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: "80px",
              width: "100%",
              maxHeight: "250px",
              overflowY: "auto",
              overscrollBehavior: "none",
            }}
          >
            {friends.map((friend, index) => (
              <div
                key={index}
                style={{
                  height: "80px",
                  borderTop: "1px solid rgba(0,0,0,0.3)",
                  background:
                    "linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,165,0,0.2))",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ marginLeft: "10px" }}>{friend}</span>
                <Button
                  variant="text"
                  style={{ color: "gray" }}
                  onClick={() => {
                    setMessageWindows(true);
                  }}
                >
                  Message
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gépes üzenetek */}
      {messageWindows && !isMobileView && (
        <div
          style={{
            height: "100%",
            backgroundColor: "white",
            marginLeft: "20px",
            marginRight: "20px",
            maxWidth: "350px",
            minWidth: "200px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => setMessageWindows(false)}
            variant="outlined"
            style={{
              color: "gray",
              borderColor: "gray",
              marginTop: "10px",
              marginRight: "10px",
              width: "30px",
              alignSelf: "flex-end",
            }}
          >
            X
          </Button>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "lightgray",
              height: "90%",
              width: "90%",
              borderRadius: "10px",
              border: "1px solid lightgrey",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <div style={{ flex: 1, overflowY: "auto" }}>{/* messages */}</div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "auto",
              }}
            >
              <TextField label="Enter your message" size="small" fullWidth />
              <Button
                variant="outlined"
                style={{ color: "gray", borderColor: "gray" }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isMobileView && showOtherUsers && (
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
              height: "700px",
              width: "800px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              border: "1px solid black",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid black",
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                style={{ width: "80%", marginBottom: "20px" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button
                style={{
                  color: "gray",
                  borderColor: "gray",
                  height: "40px",
                  width: "40px",
                  marginTop: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
                onClick={() => setshowOtherUsers(false)}
                variant="outlined"
              >
                X
              </Button>
            </div>

            <div
              style={{
                width: "100%",
                overflowY: "auto",
                overscrollBehavior: "none",
              }}
            >
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
                  {isFriend(user.username) ? (
                    <Button
                      variant="text"
                      style={{ color: "gray" }}
                      onClick={() => {
                        setMessageWindows(true);
                      }}
                    >
                      Message
                    </Button>
                  ) : isPending(user.username) ? (
                    <Button variant="text" disabled style={{ color: "gray" }}>
                      Pending
                    </Button>
                  ) : (
                    <Button
                      variant="text"
                      style={{ color: "gray" }}
                      onClick={() => addFriend(user.username)}
                    >
                      Add
                    </Button>
                  )}
                </div>
              ))}
            </div>
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
              setshowOtherUsers(true);
              setIsMobileMenuOpen(false);

              handleSearch("");
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

      {/* Mobilos üzenetek */}
      {isMobileView && messageWindows && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            zIndex: 3000,
            fontSize: "24px",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => setMessageWindows(false)}
            variant="outlined"
            style={{
              color: "gray",
              borderColor: "gray",
              marginTop: "10px",
              marginRight: "10px",
              width: "30px",
              alignSelf: "flex-end",
            }}
          >
            X
          </Button>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "lightgray",
              height: "100%", 
              width: "90%",
              borderRadius: "10px",
              border: "1px solid lightgrey",
              display: "flex", 
              flexDirection: "column", 
              padding: "10px",
            }}
          >
            <div style={{ flex: 1, overflowY: "auto" }}>{/* messages */}</div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "auto",
                position: "sticky",
                bottom: 0,
              }}
            >
              <TextField label="Enter your message" size="small" fullWidth />
              <Button
                variant="outlined"
                style={{ color: "gray", borderColor: "gray" }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {isMobileView && showOtherUsers && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            zIndex: 3000,
            fontSize: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderBottom: "1px solid black",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              style={{
                width: "80%",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button
              style={{
                color: "gray",
                borderColor: "gray",
                height: "40px",
                width: "40px",
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              onClick={() => setshowOtherUsers(false)}
              variant="outlined"
            >
              X
            </Button>
          </div>

          <div
            style={{
              width: "100%",
              overflowY: "auto",
              overscrollBehavior: "none",
            }}
          >
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
                <Button
                  variant="text"
                  style={{ color: "gray" }}
                  onClick={() => {
                    addFriend(user.username);
                  }}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

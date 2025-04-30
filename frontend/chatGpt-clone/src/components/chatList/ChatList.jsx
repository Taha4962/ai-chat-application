import React from "react";
import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

const ChatList = () => {
  const { getToken } = useAuth();

  // Fetch user chats from the backend
  const fetchUserChats = async () => {
    const token = await getToken();
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/userChats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch chats");
    }

    return res.json();
  };

  // Use React Query to fetch data
  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: fetchUserChats,
  });

  return (
    <div className="chat-list">
      {/* Dashboard Links */}
      <span className="title">DASHBOARD</span>
      <Link to="/Dashboard">Create a new Chat</Link>
      <Link to="/">Explore LAMA AI</Link>
      <Link to="/">Contact</Link>
      <hr />

      {/* Recent Chats Section */}
      <span className="title">RECENT CHATS</span>
      <div className="list scroll-container">
        {isLoading ? (
          <div>Loading chats...</div>
        ) : error ? (
          <div>Something went wrong. Please try again later.</div>
        ) : data?.chats?.length > 0 ? (
          data.chats[0].chats.map((chat) => (
            <Link to={`/Dashboard/chat/${chat._id}`} key={chat._id}>
              {chat.title}
            </Link>
          ))
        ) : (
          <div>No chats available. Start a new chat!</div>
        )}
      </div>
      <hr />

      {/* Upgrade Section */}
      <div className="upgrade">
        <img src="/logo.png" alt="LAMA AI Logo" />
        <div className="text">
          <span>Upgrade to LAMA AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

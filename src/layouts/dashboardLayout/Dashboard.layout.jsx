import React, { useEffect } from "react";
import "./Dashboard.layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ChatList from "../../components/chatList/ChatList.jsx";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth(); // Retrieve user authentication status
  const navigate = useNavigate();

  // Redirect to sign-in page if user is not authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // Show loading state until authentication is loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Dashboard-Layout">
      {/* Sidebar menu with chat list */}
      <div className="menu">
        <ChatList />
      </div>

      {/* Main content area */}
      <div className="content">
        <Outlet /> {/* Render child routes */}
      </div>
    </div>
  );
};

export default DashboardLayout;

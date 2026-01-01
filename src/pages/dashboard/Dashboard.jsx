import React from "react";
import "./dashboard.css";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // Mutation to create a new chat
  const mutation = useMutation({
    mutationFn: async ({ text, token }) => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/chats`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!res.ok) throw new Error("Failed to create chat");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] }); // Refresh user chats
      navigate(`/Dashboard/chat/${data.chatId}`); // Navigate to the new chat
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    try {
      const token = await getToken(); // Retrieve the token
      mutation.mutate({ text, token }); // Trigger the mutation
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header section */}
      <div className="text">
        <div className="logo">
          <img src="/logo.png" alt="LAMA AI Logo" />
          <h1>LAMA AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat Icon" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Image Analysis Icon" />
            <span>Analyze the Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Code Help Icon" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything" />
          <button type="submit">
            <img src="/arrow.png" alt="Submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

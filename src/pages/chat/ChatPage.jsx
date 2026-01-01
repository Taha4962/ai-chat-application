import React from "react";
import "./ChatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const { getToken } = useAuth(); // Retrieve the token function from Clerk
  const { id: ChatId } = useParams(); // Extract ChatId from URL params

  // Fetch chat data using react-query
  const { isLoading, error, data } = useQuery({
    queryKey: ["chat", ChatId],
    queryFn: async () => {
      const token = await getToken(); // Retrieve the Bearer token
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/chat/${ChatId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch chat data: ${res.statusText}`);
      }

      return res.json();
    },
  });

  return (
    <div className="chat-page">
      <div className="wrapper scroll-container">
        <div className="chat">
          {/* Display loading, error, or chat messages */}
          {isLoading ? (
            "Loading the chats..."
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            data?.history?.map((message, i) => (
              <div key={i}>
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{ height: 300, width: 400 }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                >
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </div>
            ))
          )}

          {/* New prompt input */}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

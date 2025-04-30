import React, { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

const NewPrompt = ({ data }) => {
  const { getToken } = useAuth(); // Retrieve token from Clerk
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const queryClient = useQueryClient();
  const endRef = useRef(null);

  // Mutation to update chat data
  const mutation = useMutation({
    mutationFn: async (token) => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/chats/${data._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: question || undefined,
            answer,
            img: img.dbData.filePath || undefined,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update chat");
      return res.json();
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          setQuestion("");
          setAnswer("");
          setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        });
    },
    onError: (err) => {
      console.error("Error updating chat:", err);
    },
  });

  // Initialize chat model
  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: "Hello there" }] },
      { role: "model", parts: [{ text: "Hey user!" }] },
    ],
    generationConfig: { maxOutputTokens: 100 },
  });

  // Scroll to the end of the chat
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;
    addMessage(text);
  };

  // Add a new message to the chat
  const addMessage = async (text) => {
    setQuestion(text);

    const parts = img.aiData.inlineData
      ? [{ inlineData: img.aiData.inlineData }, { text }]
      : [{ text }];

    try {
      const result = await chat.sendMessageStream(parts);

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
      }

      setAnswer(accumulatedText);
      const token = await getToken();
      mutation.mutate(token);
    } catch (error) {
      console.error("Error generating content:", error);
      setAnswer("I'm unable to process that request.");
    }
  };

  return (
    <>
      {/* Display loading state */}
      {img.isLoading && <div>Loading...</div>}

      {/* Display uploaded image */}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {/* Display user question */}
      {question && <div className="message user">{question}</div>}

      {/* Display AI response */}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      {/* Scroll to the end of the chat */}
      <div className="end-chat" ref={endRef}></div>

      {/* Input form */}
      <form className="new-form" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input type="text" name="text" placeholder="Ask me anything." />
        <button>
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;

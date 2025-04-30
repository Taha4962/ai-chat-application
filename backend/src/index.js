import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import { Chat } from "./models/chat.models.js";
import { UserChat } from "./models/userChat.models.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const app = express();

// Middleware for Clerk authentication
app.use(ClerkExpressWithAuth());

// Enable CORS for the client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to database.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

const port = process.env.SERVER_PORT;

// ImageKit configuration
const imageKit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// Route to fetch ImageKit authentication parameters
app.get("/api/v1/upload", (req, res) => {
  const result = imageKit.getAuthenticationParameters();
  res.json({ result, message: "Authentication parameters fetched." });
});

// Route to create a new chat
app.post("/api/v1/chats", ClerkExpressWithAuth(), async (req, res) => {
  const userId = req.auth?.userId;
  const { text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ message: "userId and text are required." });
  }

  try {
    // Create a new chat
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    // Check if the user already has chats
    const userChat = await UserChat.findOne({ userId });

    if (!userChat) {
      // Create a new user chat document if none exists
      const newUserChat = new UserChat({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChat.save();
    } else {
      // Add the new chat to the user's existing chats
      await UserChat.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }

    res
      .status(201)
      .json({ chatId: newChat._id, message: "Chat created successfully." });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch all chats for a user
app.get("/api/v1/userChats", ClerkExpressWithAuth(), async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No userId found" });
  }

  try {
    const chats = await UserChat.find({ userId });
    res.status(200).json({ message: "Chats fetched successfully", chats });
  } catch (err) {
    console.error("Error fetching user chats:", err);
    res.status(500).json({ message: "Server Error while fetching the chats." });
  }
});

// Route to fetch a single chat by ID
app.get("/api/v1/chat/:id", ClerkExpressWithAuth(), async (req, res) => {
  const userId = req.auth?.userId;
  const chatId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No userId found" });
  }

  try {
    const chat = await Chat.findOne({
      _id: new mongoose.Types.ObjectId(chatId),
      userId,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      message: "Single chat fetched successfully.",
      history: chat.history,
    });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Server Error while fetching the chat." });
  }
});

// Route to update a chat
app.put("/api/v1/chats/:id", ClerkExpressWithAuth(), async (req, res) => {
  const userId = req.auth?.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res
      .status(200)
      .json({ message: "Chat updated successfully.", updatedChat });
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).json({ message: "Server Error while updating the chat." });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});

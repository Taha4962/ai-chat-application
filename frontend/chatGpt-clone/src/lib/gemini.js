// const { GoogleGenerativeAI } = require("@google/genai");
// import { GoogleGenerativeAI } from "@google/genai";
// import GoogleGenerativeAI from "@google/generative-ai";

// const safetySettings = [
//   {
//     category: "HARM_CATEGORY_HARASSMENT",
//     threshold: "BLOCK_LOW_AND_ABOVE",
//   },
//   {
//     category: "HARM_CATEGORY_HATE_SPEECH",
//     threshold: "BLOCK_LOW_AND_ABOVE",
//   },
// ];

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// const model = genAI.GoogleGenerativeModel({
//   model: "gemini-2.0-flash",
//   safetySettings,
// });

// export default model;
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Define safety settings for content moderation
const safetySettings = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_LOW_AND_ABOVE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
];

// Configure the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  safetySettings,
});

export default model;

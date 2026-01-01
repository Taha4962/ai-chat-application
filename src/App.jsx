import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatPage from "./pages/chat/ChatPage";
import RootLayout from "./layouts/rootLayout/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/Dashboard.layout";
import SignIn from "./pages/signIn/SignInPage";
import SignUp from "./pages/signUp/SignUpPage";

const App = () => {
  // Define application routes
  const router = createBrowserRouter([
    {
      element: <RootLayout />, // Root layout for the application
      children: [
        { path: "/", element: <HomePage /> }, // Home page route
        { path: "/sign-in/*", element: <SignIn /> }, // Sign-in page route
        { path: "/sign-up/*", element: <SignUp /> }, // Sign-up page route
        {
          element: <DashboardLayout />, // Dashboard layout for nested routes
          children: [
            { path: "/Dashboard", element: <Dashboard /> }, // Dashboard page route
            { path: "/Dashboard/chat/:id", element: <ChatPage /> }, // Chat page route
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

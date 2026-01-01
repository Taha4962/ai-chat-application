import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
  const queryClient = new QueryClient(); // Initialize React Query client

  return (
    <QueryClientProvider client={queryClient}>
      <div className="rootLayout">
        {/* Header section */}
        <header>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="LAMA AI Logo" />
            <span>LAMA AI</span>
          </Link>
          <div className="user">
            <SignedIn>
              <UserButton /> {/* Display user button when signed in */}
            </SignedIn>
          </div>
        </header>

        {/* Main content section */}
        <main>
          <Outlet /> {/* Render child routes */}
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default RootLayout;

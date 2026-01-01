import React from "react";
import "./signIn.css";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      {/* Clerk's SignIn component with routing and redirection configuration */}
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/Dashboard"
      />
    </div>
  );
};

export default SignInPage;

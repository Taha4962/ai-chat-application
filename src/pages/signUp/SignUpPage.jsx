import React from "react";
import "./signUp.css";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      {/* Clerk's SignUp component with routing configuration */}
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;

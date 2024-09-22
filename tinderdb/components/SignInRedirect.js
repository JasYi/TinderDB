"use client";

import React, { useEffect } from "react";

function SignInRedirect() {
  useEffect(() => {
    window.location.href =
      "https://helpful-dassie-78.clerk.accounts.dev/sign-in"; // Replace with your actual Sign-In URL
  }, []);

  return (
    <div>
      <p>Redirecting to Sign In...</p>
    </div>
  );
}

export default SignInRedirect;

"use client";

import React, { useEffect } from "react";

function SignUpRedirect() {
  useEffect(() => {
    window.location.href =
      "https://helpful-dassie-78.clerk.accounts.dev/sign-up"; // Replace with your actual Sign-Up URL
  }, []);

  return <div></div>;
}

export default SignUpRedirect;

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TinderDB</title>
      </Head>
      <SignedOut>
        <div
          className="d-flex flex-column align-items-center justify-content-center vh-100"
          style={{ padding: "20px" }}>
          <p
            style={{
              color: "#13376a",
              fontSize: "5rem",
              textAlign: "center",
              fontFamily: "sans-serif",
              marginBottom: "10px", // Adjusted to reduce space between elements
              marginTop: "10px", // Adjust this if needed
              fontWeight: "bold",
            }}>
            TinderDB
          </p>
          <Image
            src="/Logo.png"
            alt="Image"
            width={400}
            height={300}
            style={{ marginTop: 0 }} // Added this to ensure no extra space
          />
        </div>
      </SignedOut>
    </>
  );
}

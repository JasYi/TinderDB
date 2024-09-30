import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <div className="signInButtonWrapper">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="signInButtonWrapper">
                <SignOutButton />
              </div>
              <TinderCards />
              {/* <SwipeButtons /> */}
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}

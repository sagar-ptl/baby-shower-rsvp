"use client";

import { useState } from "react";
import SplashScreen from "./SplashScreen";

export default function InvitationShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  console.log("I'm in InvitationShell.");
  return (
    <>
      {showSplash && (
        <SplashScreen
          onEnter={() => setShowSplash(false)}
        />
      )}

      {!showSplash && children}
    </>
  );
}
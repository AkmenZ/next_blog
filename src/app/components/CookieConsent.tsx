"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    setShowConsent(!hasCookie("cookieConsent"));
  }, []);

  function giveConsent() {
    // setting expire time to be 1 day
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
    setCookie("cookieConsent", true, { expires: oneDayFromNow });
    setShowConsent(false);
  }

  return (
    <>
      {showConsent && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed bottom-0 left-0 w-full bg-white p-6 z-50 flex justify-between items-center border-t border-black border-opacity-20">
            <p>
              This website uses cookies to improve user experience. By using
              this website you consent to all the Terms of Usage in accordance
              with our{" "}
              {
                <Link href={"/privacy"} className="text-purple-700 underline">
                  Privacy Policy
                </Link>
              }
            </p>
            <Button
              color="secondary"
              variant="ghost"
              radius="sm"
              onClick={giveConsent}
            >
              Accept
            </Button>
          </div>
        </>
      )}
    </>
  );
}

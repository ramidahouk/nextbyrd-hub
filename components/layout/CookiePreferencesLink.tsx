"use client";

import React from "react";

type CookiePreferencesLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function CookiePreferencesLink({
  className,
  children = "Cookie preferences",
}: CookiePreferencesLinkProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event("nb:open-cookie-preferences"));
      }}
    >
      {children}
    </button>
  );
}

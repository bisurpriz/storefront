"use client";

import posthog from "posthog-js";
import { PostHogProvider as OriginalPostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Initialize PostHog only on the client side
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      process.env.NEXT_PUBLIC_HOST === "https://bonnmarse.com"
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true, // Automatically capture pageviews
        capture_pageleave: true, // Capture when users leave the page
        person_profiles: "always",
        autocapture: true, // Automatically capture clicks, form submissions, etc.
        session_recording: {
          maskAllInputs: false, // Set to true to mask all input values
          maskInputOptions: {
            password: true, // Always mask password inputs
            email: false, // Don't mask email inputs by default
            number: false, // Don't mask number inputs by default
            // Add other input types as needed
          },
        },
        persistence: "localStorage+cookie", // Use both localStorage and cookies for persistence
        bootstrap: {
          distinctID: "anonymous", // Will be overridden if user is identified
        },
        disable_session_recording: false, // Enable session recording
        opt_in_site_apps: true, // Enable site apps
      });
    }

    // No need for cleanup as PostHog doesn't have a shutdown method
    // The instance will be garbage collected when the app unmounts
  }, []);

  return (
    <OriginalPostHogProvider client={posthog}>
      {children}
    </OriginalPostHogProvider>
  );
}

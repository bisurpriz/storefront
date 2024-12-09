"use client";
import useFcmToken from "@/hooks/useFCMToken";
import firebaseApp from "@/lib/firebaseApp";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";

export default function NotificationListener() {
  const { notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {});
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {});
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null;
}

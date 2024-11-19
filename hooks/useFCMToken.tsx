"use client";
import { createFCMToken } from "@/app/actions";
import firebaseApp from "@/lib/firebaseApp";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BJK_mRJlvAelp_s0mk6TA1EWiPO6owTN2_sjMEnI8qqjWnZ0P4xsBzGeaGEiD1Vwt7WeKCycUopq1whVFLdAE7I",
              serviceWorkerRegistration: await navigator.serviceWorker.ready,
            });
            if (currentToken) {
              setToken(currentToken);
              createFCMToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one.",
              );
            }
          }
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;

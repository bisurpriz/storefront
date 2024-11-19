'use client'
import useFcmToken from '@/hooks/useFCMToken';
import firebaseApp from '@/lib/firebaseApp';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

export default function NotificationListener() {
  const { notificationPermissionStatus } = useFcmToken();
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then((registration) => console.log('scope is: ', registration.scope));
      }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        console.log('notificationPermissionStatus:', notificationPermissionStatus);
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => console.log('Foreground push notification received:', payload));
        return () => {
          unsubscribe(); 
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; 
}

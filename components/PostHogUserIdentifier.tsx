'use client';

import { useEffect } from 'react';
import { usePostHog } from '@/hooks/usePostHog';

interface PostHogUserIdentifierProps {
  userId?: string;
  isAuthenticated: boolean;
  userProperties?: Record<string, any>;
}

/**
 * Component that identifies users in PostHog
 * This should be rendered in layouts or pages where user information is available
 */
export function PostHogUserIdentifier({
  userId,
  isAuthenticated,
  userProperties = {},
}: PostHogUserIdentifierProps) {
  const { identify, getGuestId, setUserProperties } = usePostHog();

  useEffect(() => {
    // If the user is authenticated and we have a userId, identify them
    if (isAuthenticated && userId) {
      identify(userId, {
        is_authenticated: true,
        ...userProperties,
      });
    } else {
      // For anonymous users, use a guest ID
      const guestId = getGuestId();
      
      // Set additional properties for the guest user
      setUserProperties({
        is_authenticated: false,
        is_guest: true,
        ...userProperties,
      });
    }
  }, [userId, isAuthenticated, userProperties, identify, getGuestId, setUserProperties]);

  // This component doesn't render anything
  return null;
} 

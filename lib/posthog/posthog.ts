'use client';

import posthog from 'posthog-js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Identifies a user in PostHog
 * @param userId - The user's ID
 * @param userProperties - Additional properties to associate with the user
 */
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  posthog.identify(userId, userProperties);
};

/**
 * Resets the current user, typically used for logout
 */
export const resetUser = () => {
  if (typeof window === 'undefined') return;
  
  posthog.reset();
};

/**
 * Generates or retrieves a guest ID for anonymous users
 * @returns A UUID for the guest
 */
export const getGuestId = (): string => {
  if (typeof window === 'undefined') return '';
  
  // Check if we already have a guest ID in localStorage
  let guestId = localStorage.getItem('posthog_guest_id');
  
  // If not, create a new one
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('posthog_guest_id', guestId);
    
    // Identify the guest user
    posthog.identify(guestId, {
      is_guest: true,
    });
  }
  
  return guestId;
};

/**
 * Tracks a custom event in PostHog
 * @param eventName - The name of the event
 * @param properties - Additional properties to associate with the event
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  posthog.capture(eventName, properties);
};

/**
 * Sets properties on the user profile
 * @param properties - The properties to set
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  posthog.people.set(properties);
};

/**
 * Sets a property only once on the user profile
 * @param properties - The properties to set once
 */
export const setUserPropertiesOnce = (properties: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  posthog.people.set_once(properties);
};

/**
 * Increments a numeric property on the user profile
 * @param property - The property to increment
 * @param value - The amount to increment by (default: 1)
 */
export const incrementUserProperty = (property: string, value: number = 1) => {
  if (typeof window === 'undefined') return;
  
  // Use type assertion to bypass TypeScript error
  (posthog.people as any).increment(property, value);
};

/**
 * Adds a value to a list property on the user profile
 * @param property - The list property to append to
 * @param value - The value to append
 */
export const appendToUserProperty = (property: string, value: any) => {
  if (typeof window === 'undefined') return;
  
  // Use type assertion to bypass TypeScript error
  (posthog.people as any).append(property, value);
};

/**
 * Tracks a page view manually (useful when automatic page views are disabled)
 * @param properties - Additional properties to associate with the page view
 */
export const trackPageView = (properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  posthog.capture('$pageview', {
    $current_url: window.location.href,
    ...properties,
  });
};

/**
 * Enables or disables session recording
 * @param enabled - Whether to enable or disable session recording
 */
export const setSessionRecording = (enabled: boolean) => {
  if (typeof window === 'undefined') return;
  
  if (enabled) {
    posthog.startSessionRecording();
  } else {
    posthog.stopSessionRecording();
  }
};

/**
 * Checks if PostHog is loaded and ready
 * @returns Whether PostHog is loaded
 */
export const isPostHogLoaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return posthog.__loaded;
}; 

'use client';

import { useCallback, useEffect } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';
import * as PostHogUtils from '@/lib/posthog/posthog';

/**
 * Custom hook for using PostHog in components
 * Provides methods for tracking events, identifying users, etc.
 */
export const usePostHog = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when the route changes
  useEffect(() => {
    if (pathname) {
      // Wait a bit to ensure the page has fully loaded
      const timeout = setTimeout(() => {
        PostHogUtils.trackPageView({
          path: pathname,
          search: searchParams?.toString(),
          referrer: document.referrer,
          title: document.title,
        });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [pathname, searchParams]);

  /**
   * Identify a user in PostHog
   */
  const identify = useCallback((userId: string, properties?: Record<string, any>) => {
    PostHogUtils.identifyUser(userId, properties);
  }, []);

  /**
   * Reset the current user (for logout)
   */
  const reset = useCallback(() => {
    PostHogUtils.resetUser();
  }, []);

  /**
   * Get or create a guest ID for anonymous users
   */
  const getGuestId = useCallback(() => {
    return PostHogUtils.getGuestId();
  }, []);

  /**
   * Track a custom event
   */
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    PostHogUtils.trackEvent(eventName, properties);
  }, []);

  /**
   * Set properties on the user profile
   */
  const setUserProperties = useCallback((properties: Record<string, any>) => {
    PostHogUtils.setUserProperties(properties);
  }, []);

  /**
   * Set properties only once on the user profile
   */
  const setUserPropertiesOnce = useCallback((properties: Record<string, any>) => {
    PostHogUtils.setUserPropertiesOnce(properties);
  }, []);

  /**
   * Enable or disable session recording
   */
  const setSessionRecording = useCallback((enabled: boolean) => {
    PostHogUtils.setSessionRecording(enabled);
  }, []);

  /**
   * Check if PostHog is loaded
   */
  const isLoaded = useCallback(() => {
    return PostHogUtils.isPostHogLoaded();
  }, []);

  return {
    identify,
    reset,
    getGuestId,
    track,
    setUserProperties,
    setUserPropertiesOnce,
    setSessionRecording,
    isLoaded,
    posthog, // Expose the raw PostHog instance for advanced usage
  };
}; 

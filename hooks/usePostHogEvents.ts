'use client';

import { usePostHog } from './usePostHog';
import { useCallback } from 'react';

/**
 * Custom hook for tracking specific events in components
 * This hook provides pre-defined event tracking functions for common actions
 */
export const usePostHogEvents = () => {
  const { track } = usePostHog();

  /**
   * Track a product view event
   */
  const trackProductView = useCallback((product: {
    id: string;
    name: string;
    price?: number;
    category?: string;
    brand?: string;
    [key: string]: any;
  }) => {
    track('product_viewed', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_category: product.category,
      product_brand: product.brand,
      ...product,
    });
  }, [track]);

  /**
   * Track a product added to cart event
   */
  const trackAddToCart = useCallback((product: {
    id: string;
    name: string;
    price?: number;
    quantity?: number;
    category?: string;
    brand?: string;
    [key: string]: any;
  }) => {
    track('product_added_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_quantity: product.quantity || 1,
      product_category: product.category,
      product_brand: product.brand,
      ...product,
    });
  }, [track]);

  /**
   * Track a product removed from cart event
   */
  const trackRemoveFromCart = useCallback((product: {
    id: string;
    name: string;
    price?: number;
    quantity?: number;
    [key: string]: any;
  }) => {
    track('product_removed_from_cart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_quantity: product.quantity || 1,
      ...product,
    });
  }, [track]);

  /**
   * Track a checkout started event
   */
  const trackCheckoutStarted = useCallback((cart: {
    total: number;
    items: Array<{
      id: string;
      name: string;
      price?: number;
      quantity?: number;
      [key: string]: any;
    }>;
    [key: string]: any;
  }) => {
    track('checkout_started', {
      cart_total: cart.total,
      cart_items_count: cart.items.length,
      cart_items: cart.items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        product_quantity: item.quantity || 1,
      })),
      ...cart,
    });
  }, [track]);

  /**
   * Track a checkout completed event
   */
  const trackCheckoutCompleted = useCallback((order: {
    id: string;
    total: number;
    items: Array<{
      id: string;
      name: string;
      price?: number;
      quantity?: number;
      [key: string]: any;
    }>;
    [key: string]: any;
  }) => {
    track('checkout_completed', {
      order_id: order.id,
      order_total: order.total,
      order_items_count: order.items.length,
      order_items: order.items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        product_quantity: item.quantity || 1,
      })),
      ...order,
    });
  }, [track]);

  /**
   * Track a search event
   */
  const trackSearch = useCallback((search: {
    query: string;
    results_count?: number;
    [key: string]: any;
  }) => {
    track('search_performed', {
      search_query: search.query,
      search_results_count: search.results_count,
      ...search,
    });
  }, [track]);

  /**
   * Track a button click event
   */
  const trackButtonClick = useCallback((button: {
    id?: string;
    name: string;
    location?: string;
    [key: string]: any;
  }) => {
    track('button_clicked', {
      button_id: button.id,
      button_name: button.name,
      button_location: button.location,
      ...button,
    });
  }, [track]);

  /**
   * Track a form submission event
   */
  const trackFormSubmit = useCallback((form: {
    id?: string;
    name: string;
    [key: string]: any;
  }) => {
    track('form_submitted', {
      form_id: form.id,
      form_name: form.name,
      ...form,
    });
  }, [track]);

  /**
   * Track a custom event
   */
  const trackCustomEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    track(eventName, properties);
  }, [track]);

  return {
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackCheckoutStarted,
    trackCheckoutCompleted,
    trackSearch,
    trackButtonClick,
    trackFormSubmit,
    trackCustomEvent,
  };
}; 

"use client";

const useGtmEvents = () => {
  const gtmEvent = (
    eventName: string,
    eventAction: string,
    eventLabel: string
  ) => {
    if (window && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        eventAction: eventAction,
        eventLabel: eventLabel,
      });
    }
  };

  return { gtmEvent };
};

export default useGtmEvents;

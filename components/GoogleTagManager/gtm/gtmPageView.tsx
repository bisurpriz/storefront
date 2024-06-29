export const gtmPageView = (url: string): void => {
  const pageEvent = {
    event: "page_view",
    page: url,
  };
  window.dataLayer.push(pageEvent);
};

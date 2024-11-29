export const useClassname = () => {
  const toggleClass = (
    className: string,
    // any element that has a classList property
    element: Element & { classList: DOMTokenList },
  ) => {
    element.classList.toggle(className);
  };

  return { toggleClass };
};

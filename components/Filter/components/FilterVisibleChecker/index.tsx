export const VisibleChecker = ({ filterType, filterTypes, children }) => {
  if (filterTypes.includes(filterType)) {
    return children;
  }
  return null;
};

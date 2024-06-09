export const VisibleChecker = ({ filterType, filterTypes, children }) => {
  if (filterTypes.includes(filterType)) {
    return <span className="snap-start">{children}</span>;
  }
};

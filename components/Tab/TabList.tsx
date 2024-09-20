import { FC } from "react";
import { TabsList as BaseTabsList, TabsListProps } from "@mui/base/TabsList";
import clsx from "clsx";

const TabList: FC<TabsListProps> = (props) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={props.ref}
      className={clsx(
        "mb-4 rounded-md bg-primary flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg transition-all duration-300",
        className
      )}
      {...other}
    />
  );
};

export default TabList;

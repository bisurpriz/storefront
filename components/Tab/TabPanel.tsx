import { TabPanel as BaseTabPanel, TabPanelProps } from "@mui/base/TabPanel";
import clsx from "clsx";
import { FC } from "react";

const TabPanel: FC<TabPanelProps> = ({ ref, ...props }) => {
  const { className, ...other } = props;
  return <BaseTabPanel ref={ref} className={clsx(className)} {...other} />;
};

export default TabPanel;

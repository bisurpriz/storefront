interface MenuItem {
  text: string | React.ReactElement;
  link?: string;
  subMenuItems?: MenuItem[];
  icon?: React.ReactSVGElement | React.ReactElement;
}

interface MenuProps {
  items: MenuItem[] | undefined;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

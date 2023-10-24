interface DrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  placement?: "left" | "right" | "top" | "bottom";
}

interface TabsProps {
  tabs: TabProps[];
  bordered?: boolean;
  onTabChange?: (tab: TabProps) => void;
  activeTab?: TabProps;
}

interface TabProps {
  label: string;
  content: React.ReactNode;
  id: string;
}

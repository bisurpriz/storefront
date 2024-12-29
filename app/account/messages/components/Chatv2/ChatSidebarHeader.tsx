import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { FC } from "react";

type ChatSidebarHeaderProps = {
  toggleUserList: () => void;
};

const ChatSidebarHeader: FC<ChatSidebarHeaderProps> = ({ toggleUserList }) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-border p-4">
      <h2 className="text-2xl font-bold">Mesajlar</h2>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleUserList}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatSidebarHeader;

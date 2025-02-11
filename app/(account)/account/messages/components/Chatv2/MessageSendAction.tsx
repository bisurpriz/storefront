import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FC } from "react";

type MessageSendActionProps = {
  handleSendMessage: (message: any) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  selectedUser: any;
  user: any;
};

const MessageSendAction: FC<MessageSendActionProps> = ({
  handleSendMessage,
  newMessage,
  selectedUser,
  setNewMessage,
  user,
}) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage({
            created_at: new Date().toISOString(),
            id: new Date().getTime(),
            is_read: false,
            message: newMessage,
            receiver: {
              id: selectedUser.id,
              lastMessage: newMessage,
              name: selectedUser.name,
              picture: selectedUser.picture,
            },
            sender: {
              id: user.id,
              lastMessage: newMessage,
              name: user.firstname + " " + user.lastname,
              picture: user.picture,
            },
          });
        }}
        className="flex items-center space-x-4 border-t border-border p-4"
      >
        <TextField
          type="text"
          fullWidth
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="mr-2 h-12 flex-1"
        />
        <Button type="submit" className="h-12 w-12" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

export default MessageSendAction;

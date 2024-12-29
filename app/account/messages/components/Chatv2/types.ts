export interface User {
  picture: string | null;
  id: string;
  name: string;
  lastMessage: string;
}

export interface Message {
  message: string;
  id: number;
  is_read: boolean;
  created_at: string;
  sender: User;
  receiver: User;
}

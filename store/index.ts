import { Chat_Thread } from "@/graphql/generated-types";
import { create } from "zustand";

type ChatStoreState = {
  chats: Chat_Thread[];
  setChats: (chats: any[]) => void;
  addMessage: (message: any) => void;
};

const useChatStore = create<ChatStoreState>((set) => ({
  chats: null,
  addMessage: (message: any) =>
    set((state) => ({
      chats: state.chats.map((item) => {
        return {
          ...item,
          messages: [
            ...item.messages,
            {
              ...message,
            },
          ],
        };
      }),
    })),
  setChats: (newChats: any[]) => set((state) => ({ chats: newChats })),
}));

export default useChatStore;

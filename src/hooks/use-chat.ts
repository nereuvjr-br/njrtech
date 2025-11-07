"use client";

import * as React from "react";

type ChatContextType = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <ChatContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

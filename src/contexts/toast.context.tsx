import React, { createContext, useContext, useState } from "react";

interface IToastContext {
  messages: { id: string; message: string; type: "success" | "error" }[];
  addMessage: (message: {
    id: string;
    message: string;
    type: "success" | "error";
  }) => void;
  removeMessage: (id: string) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

type ToastProviderProps = {
  children: React.ReactNode;
};
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [messages, setMessages] = useState<
    { id: string; message: string; type: "success" | "error" }[]
  >([]);

  const addMessage = (message: {
    id: string;
    message: string;
    type: "success" | "error";
  }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <ToastContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

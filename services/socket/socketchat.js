import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  sender: string;
  message: string;
  createdAt: string;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  error: string | null;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const SOCKET_SERVER_URL = "https://portifoliodb.onrender.com"; // URL do servidor

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar conexão com Socket.IO
    const newSocket = io(SOCKET_SERVER_URL, { transports: ["websocket", "polling"] });
    setSocket(newSocket);

    // Receber mensagens do servidor
    newSocket.on("event", (data: any) => {
      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: data.sender || "Servidor",
            message: data.message,
            createdAt: data.createdAt || new Date().toISOString(),
          },
        ]);
      }
    });

    // Cleanup na desconexão
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = async (message: string): Promise<void> => {
    if (!socket) {
      setError("Conexão com o servidor não foi estabelecida.");
      return;
    }

    try {
      socket.emit("event", { message }, (ack: { success: boolean; error?: string }) => {
        if (!ack.success) {
          setError(ack.error || "Erro ao enviar mensagem para o servidor.");
        }
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Erro inesperado ao enviar mensagem.");
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, error }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext deve ser usado dentro de um ChatProvider");
  }
  return context;
};

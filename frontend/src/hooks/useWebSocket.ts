import { useEffect, useState, useCallback } from "react";
import websocketService from "../services/websocketService";

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    websocketService.connect();

    const handleMessage = (message: string) => {
      setLastMessage(message);
    };

    websocketService.onMessage(handleMessage);

    const interval = setInterval(() => {
      setIsConnected(websocketService.isConnected());
    }, 500);

    return () => {
      clearInterval(interval);
      websocketService.disconnect();
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    websocketService.send(message);
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
};

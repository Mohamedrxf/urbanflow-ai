const WS_URL =
  import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/ws/dashboard";

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageCallback: ((message: string) => void) | null = null;

  connect() {
    if (this.ws) {
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      return;
    }

    this.ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onmessage = (event) => {
      if (this.messageCallback) {
        this.messageCallback(event.data);
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  onMessage(callback: (message: string) => void) {
    this.messageCallback = callback;
  }

  isConnected() {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const websocketService = new WebSocketService();
export default websocketService;

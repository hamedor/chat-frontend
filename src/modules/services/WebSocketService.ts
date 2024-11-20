import AbstractWebsocketService from "@/modules/services/AbstractWebsocketService.ts";

class WebSocketService extends AbstractWebsocketService {
  private socket: WebSocket | null = null;
  private readonly url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  connect(token: string, username: string): void {
    try {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("Подключено к WebSocket серверу");

        if (token) {
          this.send({ token });
        }
      };

    } catch (error) {
      console.error('Ошибка при подключении к WebSocket:', error);
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.messageHandlers.forEach(handler => handler(data))
    }

    this.socket.onclose = () => {
      console.log('Соединение с websocket сервером закрыто')
    }

    this.socket.onerror = (error) => {
      console.error('Ошибка:', error)
    }
  }
  disconnect() {
    if(this.socket) {
      this.socket.close()
    }
  }
  send(data: any): void {
    if(this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  }
}

export default WebSocketService
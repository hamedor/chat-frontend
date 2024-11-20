export type MessageHandler = (data: any) => void;

abstract class AbstractWebsocketService {
  protected messageHandlers: MessageHandler[] = []

  addMessageHandler(handler: MessageHandler): void {
    this.messageHandlers.push(handler)
  }

  removeMessageHandler(): void {
    this.messageHandlers = this.messageHandlers.filter((handler) => handler !== handler)
  }

  abstract connect(token: string, username: string): void;
  abstract disconnect(): void;
  abstract send(data: any): void;
}

export default AbstractWebsocketService;
export type MessageHandler = (data: any) => void;

abstract class AbstractWebsocketService {
  protected messageHandlers: MessageHandler[] = []

  addMessageHandler(handler: MessageHandler): void {
    this.messageHandlers.push(handler)
  }

  removeMessageHandler(messageHandler: MessageHandler): void {
    this.messageHandlers = this.messageHandlers.filter((handler) => handler !== messageHandler)
  }

  abstract connect(token: string, username: string): void;
  abstract disconnect(): void;
  abstract send(data: any): void;
}

export default AbstractWebsocketService;
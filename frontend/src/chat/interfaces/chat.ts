export interface Message {
  text: string;
  author: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
}

export type MessageHandler = (msg: string, name: string) => void;

export interface ChatSettings {
  roomId: string;
  name: string;
  messageHandler: MessageHandler;
}

export interface ChatController {
  sendMessage: (msg: string) => void;
}

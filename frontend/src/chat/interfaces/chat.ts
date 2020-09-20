export interface Message {
  text: string;
  author: string;
  authorId: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
}

export type MessageHandler = (message: Message) => void;

export interface ChatSettings {
  roomId: string;
  user: User;
  messageHandler: MessageHandler;
}

export interface ChatController {
  sendMessage: (msg: string) => void;
}

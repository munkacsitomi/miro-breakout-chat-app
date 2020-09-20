import socketioControllerFactory from './controllers/socketIoController';
import Chat from './components/Chat/Chat.svelte';
import Error from './components/Error.svelte';
import { CLIENT_ID, messagesUrl } from '../config';
import type { Message, User } from './interfaces/chat';
import { currentUser, storedMessages } from './store';

const initApp = (roomId: string, user: User) => {
  const app = new Chat({
    target: document.body,
    props: {
      roomId,
      user,
      chatFactory: socketioControllerFactory,
    },
  });
};

const getCurrentUser = async (): Promise<User> => {
  const [id, onlineUsers] = await Promise.all([
    miro.currentUser.getId(),
    // @ts-ignore
    miro.board.getOnlineUsers(),
  ]);

  return onlineUsers.find((user: User) => user.id === id);
};

const fetchData = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

const setStoreData = (messages: Message[], user: User) => {
  currentUser.set(user);
  storedMessages.set(messages);
};

miro.onReady(async () => {
  const [savedState, user, messages] = await Promise.all([
    miro.__getRuntimeState(),
    getCurrentUser(),
    fetchData(messagesUrl),
  ]);

  setStoreData(messages, user);

  if (savedState[CLIENT_ID]?.breakoutChatRoomId && user) {
    initApp(savedState[CLIENT_ID].breakoutChatRoomId, user);
  } else {
    const app = new Error({
      target: document.body,
    });
  }
});

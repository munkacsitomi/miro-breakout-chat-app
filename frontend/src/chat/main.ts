import socketioControllerFactory from './controllers/socketIoController';
import Chat from './components/Chat/Chat.svelte';
import Error from './components/Error.svelte';
import { CLIENT_ID } from '../config';
import type { User } from './interfaces/chat';

const initApp = (roomId: string, name: string) => {
  const app = new Chat({
    target: document.body,
    props: {
      roomId,
      name,
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

miro.onReady(async () => {
  const [savedState, user] = await Promise.all([miro.__getRuntimeState(), getCurrentUser()]);

  if (savedState[CLIENT_ID]?.breakoutChatRoomId && user?.name) {
    initApp(savedState[CLIENT_ID]?.breakoutChatRoomId, user.name);
  } else {
    const app = new Error({
      target: document.body,
    });
  }
});

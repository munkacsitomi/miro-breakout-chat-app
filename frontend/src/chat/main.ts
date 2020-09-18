import socketioControllerFactory from './controllers/socketIoController';
import Chat from './components/Chat/Chat.svelte';
import Error from './components/Error.svelte';

import { CLIENT_ID } from '../config';

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

const getCurrentUserName = async () => {
  const [id, onlineUsers] = await Promise.all([
    miro.currentUser.getId(),
    // @ts-ignore
    miro.board.getOnlineUsers(),
  ]);

  return onlineUsers.find((user) => user.id === id)?.name;
};

miro.onReady(async () => {
  const [savedState, name] = await Promise.all([miro.__getRuntimeState(), getCurrentUserName()]);

  if (savedState[CLIENT_ID]?.breakoutChatRoomId && name) {
    initApp(savedState[CLIENT_ID]?.breakoutChatRoomId, name);
  } else {
    const app = new Error({
      target: document.body,
    });
  }
});

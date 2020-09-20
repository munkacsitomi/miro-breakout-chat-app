<script lang="ts">
  import { onMount } from 'svelte';
  import Message from './Message.svelte';
  import type { MessageHandler, ChatController, ChatSettings, User } from '../../interfaces/chat';
  import { storedMessages } from '../../store';

  export let chatFactory: (settings: ChatSettings) => ChatController;
  export let roomId: string;
  export let user: User;

  let newMessageText: string = '';
  let chatController: ChatController = null;

  const handleNewMessage: MessageHandler = (message) => {
    storedMessages.set([...$storedMessages, message]);
  };

  const handleMessageSend = () => {
    if (!newMessageText) return;

    chatController.sendMessage(newMessageText);

    newMessageText = '';

    return false;
  };

  onMount(() => {
    chatController = chatFactory({
      roomId,
      user,
      messageHandler: handleNewMessage,
    });
  });
</script>

<style type="text/scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &__header {
      padding: 24px;
      height: 64px;
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: calc(100% - 120px);
      padding: 0 8px;
    }

    &__footer {
      padding: 0 8px;

      input {
        width: 100%;
      }
    }
  }
</style>

<div class="sidebar">
  <div class="sidebar__header"><span class="miro-h2">Breakout Chat</span></div>
  <div class="sidebar__body">
    {#each $storedMessages as message}
      <Message {message} />
    {/each}
  </div>
  <div class="sidebar__footer">
    <form on:submit|preventDefault={handleMessageSend}>
      <input
        disabled={chatController === null}
        type="text"
        class="miro-input miro-input--primary"
        bind:value={newMessageText}
        placeholder="Type your message here" />
    </form>
  </div>
</div>

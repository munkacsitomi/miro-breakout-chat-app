<script lang="ts">
  import type { Message } from '../../interfaces/chat';
  import { currentUser } from '../../store';
  export let message: Message;

  const formatTime = (timestamp: string | Date) => {
    if (!timestamp) return;

    if (typeof timestamp === 'string') {
      timestamp = new Date(timestamp);
    }

    return timestamp.toLocaleTimeString().slice(0, 5);
  };
</script>

<style type="text/scss">
  $basic-white: #fff;
  $gray-8: #ebebef;
  $gray-50: #827f9b;
  $basic-dark: #050038;
  $passionate: #3f53d9;

  .message {
    $el: &;
    display: flex;
    flex-direction: row;

    &__container {
      margin-bottom: 4px;
      background-color: $gray-8;
      align-self: flex-start;
      padding: 10px 8px;
      border-radius: 4px;
      font-size: 14px;
      color: $basic-dark;
      max-width: calc(100% - 60px);

      &:hover + #{$el}__time {
        display: block;
      }
    }

    &__author {
      font-weight: 700;
      line-height: 14px;
      margin-bottom: 6px;
    }

    &__text {
      font-weight: 400;
      line-height: 20px;
      margin: 0;
    }

    &__time {
      display: none;
      color: $gray-50;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      margin: auto 6px 6px;
    }

    &--dark {
      flex-direction: row-reverse;

      #{$el}__container {
        background-color: $passionate;
        align-self: flex-end;
      }

      #{$el}__author,
      #{$el}__text {
        color: $basic-white;
      }

      #{$el}__time {
        color: $passionate;
      }
    }

    &--showAuthor #{$el}__container {
      margin-top: 14px;
    }
  }
</style>

<div
  class="message"
  class:message--dark={message.authorId === $currentUser.id}
  class:message--showAuthor={message.showAuthor}>
  <div class="message__container">
    {#if message.showAuthor}
      <div class="message__author">{decodeURIComponent(message.author)}</div>
    {/if}
    <p class="message__text">{message.text}</p>
  </div>
  <div class="message__time">{formatTime(message.timestamp)}</div>
</div>

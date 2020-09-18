<script lang="ts">
  import type { Message } from '../../interfaces/chat';
  import { currentUser } from "../../store";
  export let message: Message;
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
      margin: 6px 0;
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
    }

    &__text {
      font-weight: 400;
      line-height: 20px;
      margin: 6px 0 0;
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
  }
</style>

<div class="message" class:message--dark={message.authorId === $currentUser.id}>
  <div class="message__container">
    <div class="message__author">{decodeURIComponent(message.author)}</div>
    <p class="message__text">{message.text}</p>
  </div>
  <div class="message__time">{message.timestamp.toLocaleTimeString().slice(0, 5)}</div>
</div>

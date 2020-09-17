<script lang="ts">
    import type { Message } from '../../interfaces/chat';
    export let message: Message;
</script>

<style type="text/scss">
$basic-white: #FFF;
$gray-8: #EBEBEF;
$gray-50: #827F9B;
$basic-dark: #050038;
$passionate: #3F53D9;

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

<div class="message message--dark">
    <div class="message__container">
        <div class="message__author">{decodeURIComponent(message.author)}</div>
        <p class="message__text">{message.text}</p>
    </div>
    <div class="message__time">{message.timestamp.toLocaleTimeString().slice(0, 5)}</div>
</div>
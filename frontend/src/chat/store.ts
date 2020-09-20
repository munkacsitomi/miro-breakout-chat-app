import { writable } from 'svelte/store';
import type { Message, User } from './interfaces/chat';

export const currentUser = writable({} as User);
export const storedMessages = writable([] as Message[]);

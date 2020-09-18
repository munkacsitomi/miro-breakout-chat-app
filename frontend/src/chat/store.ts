import { writable } from 'svelte/store';
import type { User } from './interfaces/chat';

export const currentUser = writable({} as User);

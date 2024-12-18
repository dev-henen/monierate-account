import { writable, type Writable } from 'svelte/store';

type User = {
    email: string;
    plan: string;
    credit_balance: number;
    is_active: boolean;
    token: string;
} | null; // Allow null for the initial state

export const user: Writable<User> = writable(null);

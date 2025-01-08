import type { PageServerLoad } from './$types';
import { parseJSONSafe } from '$lib/functions';
import currencySymbols from '$data/currency-symbols.json';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const authToken = cookies.get('auth_token');

    const response = await fetch(`/api/users/get_subscriptions?user_token=${authToken}`);
    let subscriptions = await response.json();
    subscriptions = parseJSONSafe(subscriptions);
    subscriptions = subscriptions.status !== 'success' ? [] : subscriptions.data;

    return {
        subscriptions,
        currencySymbols
    };
};

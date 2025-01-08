import type { PageServerLoad } from './$types';
import { parseJSONSafe } from '$lib/functions';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
    const authToken = cookies.get('auth_token');
    const { slug } = params;

    const response = await fetch(`/api/users/get_subscriptions?user_token=${authToken}`);
    let subscriptions = await response.json();
    subscriptions = parseJSONSafe(subscriptions);
    subscriptions = subscriptions.status !== 'success' ? [] : subscriptions.data;
    let subscription = subscriptions.find((subscription: any) => subscription._id === slug);
   
    if(subscription.length !> 0) {
        throw new Error('Subscription not found');
    }

    return {
        subscription,
    };
};

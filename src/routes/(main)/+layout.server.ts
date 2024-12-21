import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
    const authToken = cookies.get('auth_token');

    const isAuthPath = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup');

    if (!authToken) {
        if (!isAuthPath) {
            throw redirect(302, '/login');
        }
        return { userData: null };
    }

    const response = await fetch(`/api/users/get_user?user_token=${authToken}`);
    if (!response.ok) {
        if (!isAuthPath) {
            throw redirect(302, '/login');
        }
        return { userData: null };
    }

    let userData = await response.json();
    userData = JSON.parse(userData);
    return { userData };
};

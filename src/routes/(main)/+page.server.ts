import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const authToken = cookies.get('auth_token');
    
    if (!authToken) {
        throw redirect(302, '/login');
    }

    return {
    };
};

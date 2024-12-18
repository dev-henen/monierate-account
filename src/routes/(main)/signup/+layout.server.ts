import type { LayoutServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const authToken = cookies.get('auth_token');
    
    if (authToken && authToken !== '') {
        throw redirect(302, '/');
    }

    return {
    };
};

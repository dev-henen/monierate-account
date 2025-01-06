import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const payload = {
        user_token: authToken,
    };

    const endpoint = getAccountEndpoint("/users/send_verification_code");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    let result = await res.text();
    //console.log(result);

    return json(result);
}
import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { otp, expirationPeriod } = await request.json();
    const payload = {} as {
        user_token: string,
        verify_code: string,
        expiration_period: string
    };

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    payload.user_token = authToken;
    payload.verify_code = otp;
    //payload.expiration_period = expirationPeriod;

    const endpoint = getAccountEndpoint("/users/reset_api_key");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    let result = await res.text();
    //console.log(result);

    return json(result);
}
import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { otp } = await request.json();
    const payload = {} as {
        user_token: string,
        mfa_code: string,
    };

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    payload.user_token = authToken;
    payload.mfa_code = otp;

    const endpoint = getAccountEndpoint("/users/verify_email");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    let result = await res.text();
    //console.log(result);

    return json(result);
}
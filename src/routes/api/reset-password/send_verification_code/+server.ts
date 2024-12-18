import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const { email } = await request.json();
    const payload = {
        email: email
    };

    const endpoint = getAccountEndpoint("/auth/send_verification_code");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    const result = await res.text();
    //console.log(result);

    return json(result);
}
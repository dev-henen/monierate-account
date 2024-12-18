import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const { email, password } = await request.json();
    const payload = {
        email: email,
        password: password
    };

    const endpoint = getAccountEndpoint("/auth/register");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    const result = await res.text();
    //console.log(result);

    return json(result);
}
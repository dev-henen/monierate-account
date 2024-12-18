import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
    const { email, password, password_confirm, verify_code } = await request.json();
    const payload = {
        email: email,
        password: password,
        password_confirm: password_confirm,
        verify_code: verify_code

    };

    const endpoint = getAccountEndpoint("/auth/change_password");
    const res = await fetch(endpoint, basicAuth('POST', payload));

    const result = await res.text();
    //console.log(result);

    return json(result);
}
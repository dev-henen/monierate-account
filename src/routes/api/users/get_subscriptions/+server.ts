import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch }) {
    const parsedUrl = new URL(url);
    const queryParams = Object.fromEntries(parsedUrl.searchParams);
    const user_token = queryParams.user_token;
    const payload = {
        user_token: user_token
    };
    const endpoint = getAccountEndpoint("/users/get_subscriptions");
    const res = await fetch(endpoint, basicAuth('GET', payload));

    const result = await res.text();
    //console.log(result);

    return json(result);
}
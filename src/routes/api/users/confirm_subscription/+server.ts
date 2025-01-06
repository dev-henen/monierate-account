import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";
import { parseJSONSafe } from "$lib/functions";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { subscription_reference } = await request.json();
    const payload = {} as {
        user_token: string;
        subscription_reference: string;
    };

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {

        payload.user_token = authToken;
        //payload.subscription_reference = subscription_reference;

        const endpoint = getAccountEndpoint("/users/confirm_subscription?reference=" + subscription_reference);
        const res = await fetch(endpoint, basicAuth('POST', payload));

        const result = await res.text();
        const getResult:any = parseJSONSafe(result);
        //console.log(getResult)

        return json(getResult);

    }
}
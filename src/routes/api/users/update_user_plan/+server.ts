import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";
import { parseJSONSafe } from "$lib/functions";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { plan_id } = await request.json();
    const payload = {} as {
        user_token: string;
        plan_id: string;
    };

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {

        payload.user_token = authToken;
        payload.plan_id = plan_id;

        const endpoint = getAccountEndpoint("/users/update_user_plan");
        const res = await fetch(endpoint, basicAuth('POST', payload));

        const result = await res.text();
        const getResult:any = parseJSONSafe(result);
        //console.log(getResult)

        return json(getResult);

    }
}
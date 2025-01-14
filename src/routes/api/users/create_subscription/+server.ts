import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";
import { parseJSONSafe } from "$lib/functions";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { planID, paymentMethod, billingCircle, redirectUrl } = await request.json();
    const payload = {} as {
        user_token: string;
        plan: string;
        payment_channel: string;
        redirect_url: string;
        units: number;
    };

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {

        payload.user_token = authToken;
        payload.plan = planID;
        payload.payment_channel = paymentMethod;
        payload.redirect_url = redirectUrl;
        payload.units = 12;// billingCircle == 'monthly' ? 1 : 12;

        const endpoint = getAccountEndpoint("/users/create_subscription");
        const res = await fetch(endpoint, basicAuth('POST', payload));

        const result = await res.text();
        const getResult = parseJSONSafe(result);
        //console.log(getResult)

        return json(getResult);

    }
}
import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { deletionFeedback } = await request.json();
    const payload = {} as {
        user_token: string,
        deletion_feedback: string
    };

    if (deletionFeedback?.trim() !== "") {
        payload.deletion_feedback = deletionFeedback;
    }

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {

        payload.user_token = authToken;

        const endpoint = getAccountEndpoint("/users/delete_user");
        const res = await fetch(endpoint, basicAuth('POST', payload));

        const result = await res.text();
        const getResult = JSON.parse(result);
        if (getResult.status === "success") {
            return json({ message: "User deleted successfully" }, { status: 200 });
        } else {
            return json({ message: "Error deleting your account: " + getResult.message }, { status: 400 });
        }
    }
}
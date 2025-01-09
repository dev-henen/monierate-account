import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";
import { parseJSONSafe } from "$lib/functions";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { email, firstName, lastName, website, billingContactEmail, newPassword } = await request.json();
    const payload = {} as {
        user_token: string
        email: string
        password: string
        firstname: string
        lastname: string
        website: string
        billing_contact_email: string
    };
    const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {
        const response = await fetch(`/api/users/get_user?user_token=${authToken}`);
        if (!response.ok) {
            return json({ error: "Failed to fetch user" }, { status: 500 });
        } else {
            let currentUser:any = await response.json();
            currentUser = parseJSONSafe(currentUser);
            currentUser = currentUser.data;
            if (!currentUser) return json({ error: "User not found" }, { status: 404 });

            if (email?.trim() && currentUser.email !== email.trim()) {
                payload.email = email.trim();
            }

            if (newPassword?.trim() && currentUser.password !== newPassword.trim()) {
                payload.password = newPassword.trim();
            }

            if (firstName?.trim() && currentUser.firstname !== firstName.trim()) {
                payload.firstname = firstName.trim();
            }

            if (lastName?.trim() && currentUser.lastname !== lastName.trim()) {
                payload.lastname = lastName.trim();
            }

            if (website?.trim() && currentUser.website !== website.trim()) {
                payload.website = website.trim();
            }

            if (billingContactEmail?.trim() && currentUser.billingContactEmail !== billingContactEmail.trim()) {
                payload.billing_contact_email = billingContactEmail.trim();
            }

            if (isEmpty(payload))
                return json({ message: "No changes were made" }, { status: 400 });

            payload.user_token = authToken;

            const endpoint = getAccountEndpoint("/users/update_user");
            const res = await fetch(endpoint, basicAuth('POST', payload));

            const result = await res.text();
            const getResult:any = parseJSONSafe(result);
            if (getResult.status === "success") {
                return json({ message: "User updated successfully" }, { status: 200 });
            } else {
                return json({ message: "Error updating user: " + getResult.message }, { status: 400 });
            }

        }
    }
}
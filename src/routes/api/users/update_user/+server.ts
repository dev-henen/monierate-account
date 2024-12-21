import { basicAuth, getAccountEndpoint } from "$lib/server/utilities.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch, cookies }) {
    const authToken = cookies.get('auth_token');
    const { email, firstName, lastName, backupContactEmail, website, billingContactEmail, newPassword } = await request.json();
    const payload = {} as {
        user_token: string
        email: string
        password: string
        firstname: string
        lastname: string
        backup_contact_email: string
        website: string
        billing_contact_email: string
    };
    const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

    if (!authToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    } else {
        payload.user_token = authToken;
        const response = await fetch(`/api/users/get_user?user_token=${authToken}`);
        if (!response.ok) {
            return json({ error: "Failed to fetch user" }, { status: 500 });
        } else {
            let currentUser = await response.json();
            currentUser = JSON.parse(currentUser);
            currentUser = currentUser.data;
            if (!currentUser) return json({ error: "User not found" }, { status: 404 });

            if (email && currentUser.email !== email) {
                payload.email = email;
            }

            if (newPassword && currentUser.password !== newPassword) {
                payload.password = newPassword;
            }

            if (firstName && currentUser.firstname !== firstName) {
                payload.firstname = firstName;
            }

            if (lastName && currentUser.lastname !== lastName) {
                payload.lastname = lastName;
            }

            if (backupContactEmail && currentUser.backupContactEmail !== backupContactEmail) {
                payload.backup_contact_email = backupContactEmail;
            }

            if (website && currentUser.website !== website) {
                payload.website = website;
            }

            if (billingContactEmail && currentUser.billingContactEmail !== billingContactEmail) {
                payload.billing_contact_email = billingContactEmail;
            }

            if (isEmpty(payload))
                return json({ message: "No changes were made" }, { status: 400 });

            const endpoint = getAccountEndpoint("/users/update_user");
            const res = await fetch(endpoint, basicAuth('POST', payload));

            const result = await res.text();
            const getResult = JSON.parse(result);
            if (getResult.status === "success") {
                return json({ message: "User updated successfully" }, { status: 200 });
            } else {
                return json({ message: "Error updating user: " + getResult.message }, { status: 400 });
            }

        }
    }
}
<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { notify } from "$lib/notification";
    import { setCookie } from "$lib/functions";

    let deletionFeedback: string = "";
    let deleting: boolean = false;

    async function deleteAccount(): Promise<void> {
        try {
            deleting = true;
            const payload: Record<string, any> = {};

            if (deletionFeedback.trim() !== "") {
                payload.deletionFeedback = deletionFeedback;
            }

            const response = await fetch("/api/users/delete_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setCookie("auth_token", '', -1);
                notify(data.message || "Account deleted successfully");
                window.location.replace('/login');
            } else {
                const errorData = await response.json();
                notify(
                    errorData.message ||
                        "An error occurred while deleting the account",
                );
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            notify("Failed to delete account. Please try again later.");
        } finally {
            deleting = false;
        }
    }
</script>

<DashboardLayout title="delete my account">
    <div class="content">
        <div class="mb-12">
            <h2 class="text-2xl font-semibold mb-8">Delete Account</h2>
            <p class="mb-4" id="return-angle">
                You can delete your Monierate account using the form below.
            </p>
            <p class="mb-8">
                Please note that after deleting your account, we will not be
                able to provide you with API service any more (unless you sign
                up for another account) and any connected apps or integrations
                will stop working. Any provisions in our <a
                    href="https://monierate.com/policy/data/">Data policy</a
                > that survive termination of your account will still apply to any
                data you have received from us.
            </p>
        </div>

        <div class="mb-12">
            <div class="text-lg font-semibold mb-4">
                When you submit the form below:
            </div>
            <ul class="ml-2">
                <li class="mb-4">
                    We will delete all of your account information from our
                    systems and log you out of your account.
                </li>
                <li class="mb-4">
                    We may retain certain specific pieces of information (such
                    as your IP address, country code and business VAT number, if
                    you have provided these) where necessary in order to comply
                    with legal/financial requirements.
                </li>
                <li class="mb-4">
                    If you have contacted us by email, we may also keep a record
                    of these communications (although we will not contact you
                    again unless there is a legitimate reason for us to do so).
                </li>
                <li class="mb-4">
                    You will no longer be able to access past invoices or
                    payment history.
                </li>
                <li class="mb-4">
                    Any active integrations and App IDs will stop working
                    immediately.
                </li>
            </ul>
        </div>

        <div class="mb-12">
            <div class="mb-10">
                <p class="mb-4">
                    Please help us understand why you're deleting your Monierate
                    account:
                </p>
                <textarea
                    placeholder="Tell us why you're deleting your account"
                    class="w-full md:w-2/3 bg-transparent border border-gray-300 dark:border-gray-500 rounded-md p-4"
                    rows="4"
                    bind:value={deletionFeedback}
                ></textarea>
                <div class="text-sm text-gray-500 mt-2">
                    We sincerely appreciate any feedback you may have that could
                    help us to better serve our community.
                </div>
            </div>
            <button
                class="button bg-red-500 hover:bg-red-600 text-white"
                on:click={deleteAccount}
                disabled={deleting}>Delete my account</button
            >
        </div>
    </div></DashboardLayout
>

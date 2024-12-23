<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { notify } from "$lib/notification";
    import { goto } from "$app/navigation";

    let currentUser = $user;
    let email = currentUser.email || "";
    let firstName = currentUser.firstname || "";
    let lastName = currentUser.lastname || "";
    let backupContactEmail = currentUser.backup_contact_email || "";
    let website = currentUser.website || "";
    let billingContactEmail = currentUser.billing_contact_email || "";
    let newPassword = "";
    let error = "";
    let updating: boolean = false;

    const updateAccountDetails = async (): Promise<void> => {
        try {
            error = "";

            // Input validation
            if (!email.trim() || !firstName.trim() || !lastName.trim()) {
                error =
                    "First name, last name, and email are required for this action.";
                goto("#return-angle");
                return;
            }

            updating = true;

            const payload = {
                email: email.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                backupContactEmail: backupContactEmail?.trim() || null,
                website: website?.trim() || null,
                billingContactEmail: billingContactEmail?.trim() || null,
                newPassword: newPassword?.trim() || null,
            };

            const response = await fetch("/api/users/update_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                notify(data.message || "Account details updated successfully");
            } else {
                notify(
                    data.message ||
                        "Failed to update account details. Please try again.",
                );
            }
        } catch (error) {
            console.error("Error updating account details:", error);
            notify("An unexpected error occurred. Please try again later.");
        } finally {
            updating = false; // Reset updating state
        }
    };
</script>

<DashboardLayout title="edit account details">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">Edit Account Details</h2>
        <p class="mb-4" id="return-angle">
            These are the details we have on file for you. Please make any
            changes below and click 'Save' before exiting this page.
        </p>
        <p class="mb-8">
            There are also options to view/download your data, and/or delete
            your account, at the bottom of this page.
        </p>

        <div class="text-sm mb-8 text-red-500">{error}</div>

        <div class="mb-16">
            <h3 class="text-xl font-semibold mb-6">User Information</h3>
            <div class="w-[600px] max-w-full">
                <div class="flex gap-4 mb-4">
                    <div class="w-1/2">
                        <label for="firstName" class="label">First Name*:</label
                        >
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            class="input {error !== '' && firstName === ''
                                ? 'error'
                                : ''}"
                            bind:value={firstName}
                        />
                    </div>
                    <div class="w-1/2">
                        <label for="lastName" class="label">Last Name*:</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            class="input {error !== '' && lastName === ''
                                ? 'error'
                                : ''}"
                            bind:value={lastName}
                        />
                    </div>
                </div>
                <div class="mb-4">
                    <label for="email" class="label">Email*:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        class="input {error !== '' && email === ''
                            ? 'error'
                            : ''}"
                        bind:value={email}
                    />
                </div>
                <div class="mb-4">
                    <label for="website" class="label">Website:</label>
                    <input
                        type="url"
                        id="website"
                        placeholder="Website"
                        class="input"
                        bind:value={website}
                    />
                </div>
                <p class="text-sm text-gray-500" id="backup-contact-area-angle">
                    This value does not affect your API access.
                </p>
            </div>
        </div>

        <div class="mb-16">
            <h3 class="text-xl font-semibold mb-6">Backup Contact</h3>
            <div class="mb-4 w-[600px] max-w-full">
                <label for="backup-email" class="label"
                    >Secondary/Backup Email:</label
                >
                <input
                    type="url"
                    id="backup-email"
                    placeholder="Your backup email address"
                    class="input"
                    bind:value={backupContactEmail}
                />
            </div>
            <p class="text-sm text-gray-500">
                Adding a secondary email helps to make sure you never lose
                access to your account. This email address cannot be used to
                login, and will not receive account-related emails. It will only
                be used if we need to get in touch with you urgently, but we are
                unable to reach you at your primary email address.
            </p>
        </div>

        <div class="mb-16">
            <h3 class="text-xl font-semibold mb-6">Billing Details</h3>
            <div class="mb-4 w-[600px] max-w-full">
                <label for="billing_contact_email" class="label"
                    >Billing contact Email:</label
                >
                <input
                    type="url"
                    id="billing_contact_email"
                    placeholder="Billing email address"
                    class="input"
                    bind:value={billingContactEmail}
                />
            </div>
            <p class="text-sm text-gray-500">
                We'll send your invoices here. If no billing contact is
                provided, invoices will be sent to your primary account email
                address.
            </p>
        </div>

        <div class="mb-16">
            <h3 class="text-xl font-semibold mb-6">Change Password</h3>
            <p class="text-sm text-gray-500 mb-4">
                If you don't wish to change your password, please leave this
                blank.
            </p>
            <div class="mb-4 w-[600px] max-w-full">
                <label for="new_passowrd" class="label">New Password:</label>
                <input
                    type="password"
                    id="new_passowrd"
                    placeholder="Leave blank for no change"
                    class="input"
                    bind:value={newPassword}
                />
            </div>
            <p class="text-sm text-gray-500">
                Your password must have at least 8 characters (we recommend
                using a passphrase, e.g. four words with spaces).
            </p>
        </div>

        <button
            class="button"
            on:click={updateAccountDetails}
            disabled={updating}>Save changes</button
        >
    </div>

    <div class="content mt-20">
        <h3 class="text-xl font-semibold mb-6">
            Don't need your Monierate account any more?
        </h3>
        <div class="mb-10">
            <p class="mb-4">
                If you no longer need your Monierate account and wish to delete
                it, please click below and confirm on the next page.
            </p>
            <p class="mb-4">
                We will delete all of your account information from our system
                immediately, and any active integrations and App IDs will stop
                working.
            </p>
        </div>
        <a
            href="/delete-account"
            class="button bg-red-500 hover:bg-red-600 text-white"
            >Delete my account</a
        >
    </div>
</DashboardLayout>

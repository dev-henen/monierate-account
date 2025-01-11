<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { parseJSONSafe, getCookie, setCookie } from "$lib/functions";
    import Dialog from "$lib/components/Dialog.svelte";
    import { notify } from "$lib/notification";
    import { onMount } from "svelte";

    let currentUser = $user;
    let openDialogs: any = {
        verifyEmailAddress: false,
        notifyEmailNotVerified: false,
    };

    let otp: string = "";

    let requestNewCodeTimeFrame: number = 0;

    const requestNewCode = (): void => {
        if (requestNewCodeTimeFrame <= 0) {
            requestNewCodeTimeFrame = 60; // Reset timer
            const expirationTime =
                Math.floor(Date.now() / 1000) + requestNewCodeTimeFrame; // Save expiration time
            localStorage.setItem(
                "requestNewCodeTimeFrame",
                expirationTime.toString(),
            );
            sendOTPAndShowEmailVerificationDialog();
        }

        const countdown = (): void => {
            if (requestNewCodeTimeFrame > 0) {
                requestNewCodeTimeFrame -= 1;
                localStorage.setItem(
                    "requestNewCodeTimeFrame",
                    (
                        Math.floor(Date.now() / 1000) + requestNewCodeTimeFrame
                    ).toString(),
                );
                setTimeout(countdown, 1000); // Call countdown recursively
            }
        };

        countdown();
    };

    const sendOTPAndShowEmailVerificationDialog = async () => {
        try {
            const response = await fetch("/api/users/send_verification_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let data = await response.json();
            data = parseJSONSafe(data);
            if (data.status === "success") {
                notify("OTP sent to your email");
                openDialogs.verifyEmailAddress = true;
                openDialogs.notifyEmailNotVerified = false;
            } else {
                console.error(data.message);
                notify("Could not send OTP, please try again");
            }
        } catch (error) {
            console.error(error);
            notify("An unknown error occurred, please try again");
        }
    };

    const verificationEmail = async () => {
        try {
            if (otp == undefined) {
                notify("Please provide a valid OTP");
                return;
            }
            const response = await fetch("/api/users/verify_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp,
                }),
            });
            let data = await response.json();
            data = parseJSONSafe(data);
            if (data.status === "success") {
                notify("Email verified successfully");
                openDialogs.verifyEmailAddress = false;
            } else {
                console.error(data.message);
                notify("Invalid OTP, please try again");
            }
        } catch (error) {
            console.error(error);
            notify("An unknown error occurred, please try again");
        }
    };

    onMount(() => {
        if (
            !currentUser.is_email_verified &&
            getCookie("notifyEmailNotVerified") !== "false"
        ) {
            setCookie("notifyEmailNotVerified", "false", 1);
            openDialogs.notifyEmailNotVerified = true;
        }

        // Initialize timer from localStorage if available
        const storedTimeFrame = localStorage.getItem("requestNewCodeTimeFrame");
        if (storedTimeFrame) {
            const currentTime = Math.floor(Date.now() / 1000);
            requestNewCodeTimeFrame = Math.max(
                0,
                parseInt(storedTimeFrame) - currentTime,
            );
            if (requestNewCodeTimeFrame > 0) {
                requestNewCode();
            }
        }
    });
</script>

<DashboardLayout title="dashboard">
    <div class="content py-20 text-center">
        <p class="text-gray-600 dark:text-gray-400">No data to show</p>
    </div>

    {#if !currentUser.is_email_verified || !currentUser.is_phone_verified || currentUser.usage.requests_made_since_history <= 0}
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-md shadow-md mt-6">
            <h2 class="text-lg font-semibold mb-4">Next steps:</h2>

            <div class="space-y-4">
                <!-- Verified Step -->
                {#if !currentUser.is_email_verified}
                    <div
                        class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                    >
                        <span
                            class="text-gray-80 dark:text-gray-400 font-medium"
                        >
                            <a
                                href="/#verify-email"
                                class="font-medium hover:underline"
                                on:click={sendOTPAndShowEmailVerificationDialog}
                                >Verify your email address</a
                            >
                        </span>
                        <a
                            href="/#verify-email"
                            class="font-medium hover:underline"
                            on:click={sendOTPAndShowEmailVerificationDialog}
                            >→</a
                        >
                    </div>
                {/if}

                <!-- Add Backup Contact -->
                {#if !currentUser.is_phone_verified}
                    <div
                        class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                    >
                        <span
                            class="text-gray-80 dark:text-gray-400 font-medium"
                        >
                            <a
                                href="/edit-account-details#backup-contact-area-angle"
                                class="font-medium hover:underline"
                                >Add backup contact information</a
                            >
                        </span>
                        <a
                            href="/edit-account-details#backup-contact-area-angle"
                            class="font-medium hover:underline">→</a
                        >
                    </div>
                {/if}

                <!-- API Request Step -->
                {#if currentUser.usage.requests_made_since_history <= 0}
                    <div
                        class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                    >
                        <span
                            class="text-gray-80 dark:text-gray-400 font-medium"
                        >
                            <a
                                href="/api-keys"
                                class="font-medium hover:underline"
                                >Grab an Access Key</a
                            >
                            and
                            <a
                                href="/api-keys"
                                class="font-medium hover:underline"
                                >make your first API request</a
                            >
                        </span>
                        <a href="/api-keys" class="font-medium hover:underline"
                            >→</a
                        >
                    </div>
                {/if}

                <div class="mt-6 border-t dark:border-gray-700 py-5 text-sm">
                    <p class="text-gray-500 dark:text-gray-200 font-bold mb-3">
                        Questions about our services? Need help getting started?
                    </p>
                    <p class="text-gray-700 dark:text-gray-400">
                        If you want to know more about our services, or discuss
                        your API integration, please don't hesitate to
                        <a href="/#" class="font-medium hover:underline"
                            >get in touch</a
                        > and we'll be happy to help.
                    </p>
                </div>
            </div>
        </div>
    {/if}

    <Dialog
        bind:isOpen={openDialogs}
        id="verifyEmailAddress"
        title="Enter authentication code"
        actions={[
            {
                label: "Verify",
                callback: verificationEmail,
            },
        ]}
    >
        <p class="mb-4">
            Please enter the verification code sent to your email address to
            verify your account.
        </p>

        <label class="label" for="otp">Verify code</label>
        <input
            type="text"
            id="otp"
            class="input"
            bind:value={otp}
            placeholder="Enter code from email"
        />
        <button
            class="p-1 text-blue-500 {requestNewCodeTimeFrame > 0
                ? 'hidden'
                : ''}"
            on:click={requestNewCode}>Didn't get a code?</button
        >
        <p class="p-1 {requestNewCodeTimeFrame > 0 ? '' : 'hidden'}">
            To get a new code, please wait for {requestNewCodeTimeFrame} seconds.
        </p>
    </Dialog>

    <Dialog
        bind:isOpen={openDialogs}
        id="notifyEmailNotVerified"
        title="You have not verified your email. Do you want to verify it now?"
        actions={[
            {
                label: "Proceed",
                callback: sendOTPAndShowEmailVerificationDialog,
            },
        ]}
    >
        <p class="mb-4">Please proceed to verify your email address.</p>
    </Dialog>
</DashboardLayout>

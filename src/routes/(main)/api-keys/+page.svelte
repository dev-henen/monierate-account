<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import { user } from "$lib/stores/user";
    import {
        copyToClipboard,
        downloadStringAsFile,
        parseJSONSafe,
        maskText,
    } from "$lib/functions";
    import { notify } from "$lib/notification";
    import { onMount } from "svelte";

    let currentUser: any = $user;
    let accessKey: string = maskText(currentUser?.api_key?.slice(-40) || "", 4);
    let accessKeyState: string = "hidden";
    let openDialogs: any = {
        confirmKeyGeneration: false,
        setKeyExpiry: false,
        verifyOTP: false,
        no_api_key_prompt: false,
    };
    let expirationPeriod: string = "0h";
    let otp: string = "";

    const openDialog = (key: any) => {
        openDialogs[key] = true;
        if (otp != "") {
            otp = "";
        }
    };
    const closeDialog = (key: any) => {
        openDialogs[key] = false;
        if (otp != "") {
            otp = "";
        }
    };
    // const showExpirationPeriodDialog = () => {
    //     openDialogs.setKeyExpiry = true;
    //     openDialogs.confirmKeyGeneration = false;
    // };
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
            sendOTPAndShowVerificationDialog();
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

    const sendOTPAndShowVerificationDialog = async () => {
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
                openDialogs.setKeyExpiry = false;
                openDialogs.confirmKeyGeneration = false;
                openDialogs.no_api_key_prompt = false;
                openDialogs.verifyOTP = true;
            } else {
                console.error(data.message);
                notify("Could not send OTP, please try again");
            }
        } catch (error) {
            console.error(error);
            notify("An unknown error occurred, please try again");
        }
    };

    const generateAccessKey = async () => {
        if (otp == undefined) {
            notify("Please provide a valid OTP");
            return;
        }

        try {
            const response = await fetch(`/api/users/reset_api_key`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp,
                    expirationPeriod,
                }),
            });

            let result = await response.json();
            result = parseJSONSafe(result);

            if (result?.status === "error") {
                const message =
                    result?.message || "An error occurred. Please try again.";
                console.error(
                    `Error: ${message} (Code: ${result?.errorCode || "UNKNOWN_ERROR"})`,
                );
                notify(message);
                return;
            }

            if (result?.data?.api_key) {
                accessKey = result.data.api_key;
                accessKeyState = "visible";
                closeDialog("verifyOTP");
                notify("API key reset successfully!");
            } else {
                console.warn("API key missing in the server response.");
                notify("Unexpected server response. Please try again.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            notify("An unknown error occurred. Please try again.");
        }
    };

    const downloadAccessKey = () => {
        downloadStringAsFile(accessKey, "monierate_api_access_key.txt");
    };

    onMount(() => {
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

        if (accessKey === "") {
            openDialogs.no_api_key_prompt = true;
        }
    });
</script>

<DashboardLayout title="API Keys">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-4">API Keys</h2>
        <div class="mb-10">
            For the safety of your account, you can view and download an access
            key only once when it is generated. If you lose it, you will need to
            create a new key. When a new key is generated, the old one will
            become invalid, requiring you to update all services that rely on
            it.
        </div>
    </div>

    <div class="content">
        <div class="mt-6">
            {#if accessKey !== ""}
                <label for="access-key" class="label">Access Key</label>
                <div class="flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Access Key"
                        id="access-key"
                        class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        bind:value={accessKey}
                        readonly
                    />
                    {#if accessKeyState !== "hidden"}
                        <button
                            class="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                            title="Copy API Key"
                            aria-label="Copy API Key"
                            on:click={() => copyToClipboard(accessKey)}
                        >
                            <i class="fas fa-copy"></i> copy
                        </button>
                    {/if}
                </div>
            {/if}

            {#if accessKeyState !== "hidden"}
                <button
                    class="mt-4 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 border border-gray-500 p-2 rounded block"
                    on:click={() => downloadAccessKey()}
                    >Download access key</button
                >
            {:else}
                <button
                    class="button w-full md:w-[250px]"
                    on:click={() => openDialog("confirmKeyGeneration")}
                >
                    Generate {accessKey === "" ? "an" : "a new"} access key
                </button>
            {/if}
        </div>
    </div>

    <Dialog
        bind:isOpen={openDialogs}
        id="confirmKeyGeneration"
        title="Generate a new key?"
        actions={[
            {
                label: "Continue",
                callback: () => sendOTPAndShowVerificationDialog(),
            },
        ]}
    >
        <p class="mb-4">You're about to generate a new key.</p>
        <!-- <p class="mb-4">
            You will get to choose when the current one will expire. You need to
            replace your access key with the new one before the expiry time.
        </p> -->
        <p class="mb-4">
            For the security of your account, an authentication code will be
            sent to your email address.
        </p>
        <p class="mb-4">
            Please note that you'll only be able to see the new API key once so
            remember to copy or download and keep it safely for future use.
        </p>
        <p class="mb-4">Do you want to continue?</p>
    </Dialog>

    <!-- <Dialog
        bind:isOpen={openDialogs}
        id="setKeyExpiry"
        title="Choose current key expiration"
        actions={[
            {
                label: "Continue",
                callback: () => sendOTPAndShowVerificationDialog(),
            },
        ]}
    >
        <p class="mb-4">
            Select the expiration time for the old access keys, which will
            become invalid after generating a new key.
        </p>

        <label class="label" for="apiKeyExpiration"
            >Access key expiration period</label
        >
        <select
            class="select"
            id="apiKeyExpiration"
            bind:value={expirationPeriod}
        >
            <option value="0h">Immediately</option>
            <option value="1h">1 hour</option>
            <option value="3h">3 hours</option>
        </select>
    </Dialog> -->

    <Dialog
        bind:isOpen={openDialogs}
        id="verifyOTP"
        title="Enter authentication code"
        actions={[
            {
                label: "Generate a new access key",
                callback: () => generateAccessKey(),
            },
        ]}
    >
        <p class="mb-4">
            Please enter the verification code sent to your email address to
            generate a new access key.
        </p>

        <label class="label" for="otp">Verify authentication code</label>
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
        id="no_api_key_prompt"
        title="You don't have an access key"
        actions={[
            {
                label: "Generate now",
                callback: () => sendOTPAndShowVerificationDialog(),
            },
        ]}
    >
        <div class="content">
            <p class="mb-8">
                You haven't generated an access key yet. Would you like to
                create one now?
            </p>
        </div>
    </Dialog>
</DashboardLayout>

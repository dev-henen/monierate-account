<script lang="ts">
    import { setCookie, getCookie } from "$lib/functions";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { notify } from "$lib/notification";
    import { togglePopup } from "$lib/functions";

    let otp: string = "";
    let otpError: string = "";
    let email: any = "";
    let password: any = "";
    let password_confirm: any = "";
    let error: string = "";
    let disableActionButton: boolean = false;

    const handleChangePassword = async () => {
        otpError = otp === "" ? "error" : "";
        error = "";

        if (otpError === "error") {
            return;
        }

        const payload = {
            email: email,
            password: password,
            password_confirm: password_confirm,
            verify_code: otp,
        };

        try {
            disableActionButton = true;
            const response = await fetch(
                "/api/reset-password/change_password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            // Ensure response is properly handled
            const rawResponse = await response.json();
            const getResponse = JSON.parse(rawResponse);

            if (getResponse.status === "error") {
                error = getResponse.message || "An error occurred.";
            } else if (getResponse.status === "success") {
                setCookie("reset_password_email", "", -1);
                setCookie("reset_password_new_password", "", -1);
                setCookie("reset_password_new_password_confirm", "", -1);
                notify(getResponse.message);
                goto("/login");
            } else {
                notify(
                    "An unknown error occurred. Please try again later.",
                );
            }
            disableActionButton = false;
        } catch (error) {
            disableActionButton = false;
            console.error("Error during verification:", error);
            togglePopup({
                status: "error",
                message: "Something went wrong. Please try again later.",
            });
        }
    };

    const resendOTP = async () => {
        const payload = {
            email,
        };

        try {
            const response = await fetch(
                "/api/reset-password/send_verification_code",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            // Ensure response is properly handled
            const rawResponse = await response.json();
            const getResponse = JSON.parse(rawResponse);

            if (getResponse.status === "error") {
                notify(getResponse.message);
                return;
            } else {
                notify("OTP sent, check your email address.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            notify("Something went wrong. Please try again later.");
        }
    };

    onMount(() => {
        email = getCookie("reset_password_email");
        password = getCookie("reset_password_new_password");
        password_confirm = getCookie("reset_password_new_password_confirm");
        if (!email || !password || !password_confirm) {
            goto("/login/reset-password");
        }
    });
</script>

<svelte:head>
    <title>Verify OTP - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center md:min-h-screen">
    <div class="w-full max-w-[100%] md:max-w-[500px]">
        <div class="rounded-lg p-12 relative md:border md:dark:border-gray-700">
            <div class="mb-8">
                <img
                    src="/monierate-logo.png"
                    alt="Monierate"
                    width="150"
                    class="inline dark:hidden mb-8"
                />
                <img
                    src="/monierate-logo-white.png"
                    alt="Monierate"
                    width="150"
                    class="hidden dark:inline mb-8"
                />
                <h2 class="text-2xl font-semibold">Verify OTP</h2>
            </div>

            <div>
                <span class="text-[0.9em] text-red-500 mb-6 block">
                    {error}
                </span>
                <div>
                    <label class="label" for="otp"
                        >Enter the code sent to your email address</label
                    >
                    <input
                        type="text"
                        class="input {otpError}"
                        id="otp"
                        placeholder="OTP"
                        bind:value={otp}
                        on:change={() => (otpError = "")}
                    />
                </div>

                <div class="block text-sm text-gray-600 mb-6">
                    <a
                        href="#resend-otp"
                        class="text-blue-500"
                        on:click={resendOTP}>Didn't get a code?</a
                    >
                </div>

                <button class="button w-full" on:click={handleChangePassword} disabled={disableActionButton}>
                    Next
                </button>
            </div>
        </div>
    </div>
</div>

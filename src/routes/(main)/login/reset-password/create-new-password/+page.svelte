<script lang="ts">
    import { writable } from "svelte/store";
    import { setCookie, getCookie, parseJSONSafe } from "$lib/functions";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { notify } from "$lib/notification";

    let showPassword = writable(false);

    function togglePasswordVisibility() {
        showPassword.update((value) => !value);
    }

    let email: any = "";
    let password: string = "";
    let password_confirm: string = "";
    let passwordError: string = "";
    let password_confirmError: string = "";
    let error: string = "";
    let disableActionButton: boolean = false;
    const validatePassword = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    const handleChangePassword = async () => {
        passwordError = password === "" ? "error" : "";
        password_confirmError = password_confirm === "" ? "error" : "";
        error = "";

        if (passwordError || password_confirmError) {
            return;
        }

        if (!validatePassword.test(password)) {
            passwordError = "error";
            error =
                "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number";
            return;
        }

        if (password !== password_confirm) {
            password_confirmError = "error";
            error = "Passwords do not match";
            return;
        }

        const payload = {
            email,
        };

        try {
            disableActionButton = true;
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
            const getResponse:any = parseJSONSafe(rawResponse);

            if (getResponse.status === "error") {
                notify(getResponse.message);
            } else {
                setCookie("reset_password_new_password", password, 1);
                setCookie(
                    "reset_password_new_password_confirm",
                    password_confirm,
                    1,
                );
                notify("OTP sent, check your email address.");
                goto("/login/reset-password/verify-otp");
            }
            disableActionButton = false;
        } catch (error) {
            disableActionButton = false;
            console.error("Error during verification:", error);
            notify("Something went wrong. Please try again later.");
        }
    };

    onMount(() => {
        email = getCookie("reset_password_email");
        if (!email) {
            goto("/login/reset-password");
        }
    });
</script>

<svelte:head>
    <title>Create a new password - Monierate</title>
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
                <h2 class="text-2xl font-semibold">Create a new password</h2>
            </div>

            <div>
                <span class="text-[0.9em] text-red-500 mb-6 block">
                    {error}
                </span>
                <div>
                    <label class="label" for="new-password">New password</label>
                    <div class="relative">
                        <input
                            type={$showPassword ? "text" : "password"}
                            class="input pr-10 {passwordError}"
                            id="new-password"
                            placeholder="Minimum 8 characters"
                            bind:value={password}
                            on:change={() => (passwordError = "")}
                        />
                        <button
                            type="button"
                            class="absolute right-2 top-2.5 text-gray-500 focus:outline-none"
                            on:click={togglePasswordVisibility}
                        >
                            {#if $showPassword}
                                <!-- Eye Open Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5C7.305 4.5 3.236 7.042 1.5 12c1.736 4.958 5.805 7.5 10.5 7.5s8.764-2.542 10.5-7.5C20.764 7.042 16.695 4.5 12 4.5z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 9.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
                                    />
                                </svg>
                            {:else}
                                <!-- Eye Slash Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.98 8.217a11.842 11.842 0 00-2.48 3.783c1.736 4.958 5.805 7.5 10.5 7.5a11.977 11.977 0 005.207-1.17m2.56-2.058c.564-.747 1.066-1.576 1.413-2.472m-9.18-.948a2.25 2.25 0 11-3.18-3.18m3.018 3.018L12 12m0 0l9 9M12 12L3 3"
                                    />
                                </svg>
                            {/if}
                        </button>
                    </div>
                </div>

                <div class="mb-6">
                    <label class="label" for="new-password2"
                        >Confirm password</label
                    >
                    <input
                        type="password"
                        class="input pr-10 {password_confirmError}"
                        id="new-password2"
                        placeholder="Minimum 8 characters"
                        bind:value={password_confirm}
                        on:change={() => (password_confirmError = "")}
                    />
                </div>

                <button class="button w-full" on:click={handleChangePassword} disabled={disableActionButton}>
                    Continue
                </button>
            </div>
        </div>
    </div>
</div>

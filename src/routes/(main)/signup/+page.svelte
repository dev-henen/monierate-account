<script lang="ts">
    import { writable } from "svelte/store";
    import { togglePopup } from "$lib/functions";
    import { setCookie } from "$lib/functions";
    import { notify } from "$lib/notification";

    let showPassword = writable(false);

    function togglePasswordVisibility() {
        showPassword.update((value) => !value);
    }

    let email: string = "";
    let password: string = "";
    let privacyAccepted: boolean = false;
    let privacyError: string = "";
    let emailError: string = "";
    let passwordError: string = "";
    let error: string = "";
    let disableActionButton: boolean = false;
    const validatePassword = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const register = async () => {
        emailError = email === "" ? "error" : "";
        passwordError = password === "" ? "error" : "";
        privacyError = privacyAccepted
            ? ""
            : "Please accept our privacy policy";
        error = "";

        if (emailError || passwordError || privacyError) {
            return;
        }

        if (!validateEmail.test(email)) {
            emailError = "error";
            error = "Invalid email format. Please use a valid email address";
            return;
        }

        if (!validatePassword.test(password)) {
            passwordError = "error";
            error =
                "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number";
            return;
        }

        const payload = {
            email,
            password,
        };

        try {
            disableActionButton = true;
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // Ensure response is properly handled
            const rawResponse = await response.json();
            const getResponse = JSON.parse(rawResponse);

            if (getResponse.status === "success") {
                const getToken = getResponse.data.token;
                if (getToken) {
                    setCookie("auth_token", getToken, 165); // Store token for 165 days
                    notify("Account created successfully.");
                    window.location.replace('/'); // Redirect to dashboard
                } else {
                    togglePopup({
                        status: "error",
                        message: "Something went wrong, please try again.",
                    });
                }
            }  else if (getResponse.status === "error") {
                error = getResponse.message || "An error occurred.";
            } else {
                notify("An unknown error occurred.");
            }
            disableActionButton = false;
        } catch (error) {
            disableActionButton = false;
            console.error("Error during signup:", error);
            notify("Something went wrong. Please try again later.");
        }
    };
</script>

<svelte:head>
    <title>Sign up - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center md:min-h-screen md:mt-12">
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
                <h2 class="text-2xl font-semibold">Welcome to Monierate</h2>
            </div>

            <div>
                <span class="text-[0.9em] text-red-500">
                    {error}
                </span>
                <div class="mb-6">
                    <label class="label" for="signup-email">Email</label>
                    <input
                        type="email"
                        class="input {emailError}"
                        id="signup-email"
                        placeholder="Email address"
                        bind:value={email}
                        on:change={() => (emailError = "")}
                    />
                </div>

                <div class="mb-6">
                    <label class="label" for="signup-password">Password</label>
                    <div class="relative">
                        <input
                            type={$showPassword ? "text" : "password"}
                            class="input pr-10 {passwordError}"
                            id="signup-password"
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

                <div class="text-sm text-gray-600 mb-6 flex justify-center">
                    <span class="pr-2">
                        <input
                            type="checkbox"
                            class="checkbox w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            bind:checked={privacyAccepted}
                            on:change={() => (privacyError = "")}
                        />
                    </span>
                    <span>
                        By continuing, you agree to monierate
                        <a
                            href="https://monierate.com/policy/data"
                            class="text-blue-500">Terms of Service</a
                        >
                        and acknowledge you've read our
                        <a
                            href="https://monierate.com/policy/data"
                            class="text-blue-500">Privacy Policy</a
                        >.
                        {#if privacyError !== ""}
                            <div class="text-[0.9em] text-red-500">
                                {privacyError}
                            </div>
                        {/if}
                    </span>
                </div>

                <button class="button w-full" on:click={register} disabled={disableActionButton}>
                    Continue
                </button>
            </div>
        </div>

        <div class="w-full px-12 md:p-12 md:text-center">
            or <a href="/login">Log in</a>
        </div>
    </div>
</div>

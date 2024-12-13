<script lang="ts">
    import { writable } from "svelte/store";

    let showPassword = writable(false);

    function togglePasswordVisibility() {
        showPassword.update((value) => !value);
    }
</script>

<svelte:head>
    <title>Sign up - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
    <div
        class="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6 relative"
    >
        <div
            class="flex justify-between mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2"
        >
            <a href="/signup" class="button text-center w-1/2 font-semibold">
                Sign Up
            </a>
            <a
                href="/login"
                class="button bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-center w-1/2 font-semibold"
            >
                Login
            </a>
        </div>

        <div class="py-2">
            <img
                src="/favicon.png"
                alt="Monierate"
                width="35"
                class="inline dark:hidden"
            />
            <img
                src="/favicon-white.png"
                alt="Monierate"
                width="35"
                class="hidden dark:inline"
            />
            <h2 class="text-xl font-semibold mb-4 inline">Sign Up</h2>
        </div>

        <p class="text-sm text-gray-600 mb-4">
            By continuing, you agree to monierate <a
                href="https://monierate.com/policy/data"
                class="text-blue-500">Terms of Service</a
            >
            and acknowledge you've read our
            <a href="https://monierate.com/policy/data" class="text-blue-500"
                >Privacy Policy</a
            >.
        </p>

        <form class="space-y-4" on:submit={() => false}>
            <div>
                <label class="label" for="login-email">Email</label>
                <input
                    type="email"
                    class="input"
                    id="login-email"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label class="label" for="login-password">Password</label>
                <div class="relative">
                    <input
                        type={$showPassword ? "text" : "password"}
                        class="input pr-10"
                        id="login-password"
                        placeholder="Enter Password"
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
                <p class="text-sm text-gray-500">
                    Must be at least 8 characters
                </p>
            </div>

            <div>
                <label class="label" for="confirm-login-password"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    class="input"
                    id="confirm-login-password"
                    placeholder="Confirm Password"
                />
            </div>

            <button type="submit" class="button w-full"> Sign up </button>
        </form>

        <div
            class="flex items-center justify-center mt-4 border-b border-gray-300 mb-8"
        >
            <span
                class="text-sm text-gray-500 bg-white dark:bg-gray-900 px-2 relative bottom-[-9px]"
                >or continue with</span
            >
        </div>

        <div class="flex justify-center gap-4 mt-4">
            <button
                class="w-1/2 px-4 py-2 border dark:border-gray-700 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <img
                    src="/icons/google-logo.png"
                    alt="Google"
                    class="w-5 h-5"
                /> Google
            </button>
            <button
                class="w-1/2 px-4 py-2 border dark:border-gray-700 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <img src="/icons/apple-logo.png" alt="Apple" class="w-5 h-5" /> Apple
            </button>
        </div>
    </div>
</div>

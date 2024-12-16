<script lang="ts">
    import { writable } from "svelte/store";

    let showPassword = writable(false);

    function togglePasswordVisibility() {
        showPassword.update((value) => !value);
    }
</script>

<svelte:head>
    <title>Login - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center md:min-h-screen">
    <div class="w-full max-w-md">

        <div
            class="rounded-lg p-6 pt-0 relative md:border md:dark:border-gray-700"
        >
            <div class="py-2">
                <img
                    src="/monierate-logo.png"
                    alt="Monierate"
                    width="150"
                    class="inline dark:hidden relative ml-[-9px]"
                />
                <img
                    src="/monierate-logo-white.png"
                    alt="Monierate"
                    width="150"
                    class="hidden dark:inline relative ml-[-9px]"
                />
                <h2 class="text-xl font-semibold my-5">Login</h2>
            </div>
    
            <form class="space-y-4" on:submit={() => false}>
                <div>
                    <label class="label" for="login-email">Email</label>
                    <input
                        type="email"
                        class="input"
                        id="login-email"
                        placeholder="Email address"
                    />
                </div>
    
                <div>
                    <label class="label" for="login-password">Password</label>
                    <div class="relative">
                        <input
                            type={$showPassword ? "text" : "password"}
                            class="input pr-10"
                            id="login-password"
                            placeholder="Minimum 8 characters"
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

                <div class="block text-sm text-gray-600 pb-8">
                    <a
                        href="/login/reset-password"
                        class="text-blue-500">Forgot your password?</a
                    >
                </div>
    
                <button type="submit" class="button w-full"> Login </button>
            </form>
        </div>
    
        <div class="w-full p-6 md:text-center">
            or <a href="/signup">Get an account</a>
        </div>
    </div>
</div>

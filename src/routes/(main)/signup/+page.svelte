<script>
</script>

<svelte:head>
    <title>Sign up - Monierate</title>
</svelte:head>

<div
    class="pt-5 flex items-center justify-center"
>
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
            <img src="/favicon.png" alt="Monierate" width="35" class="inline dark:hidden"/>
            <img src="/favicon-white.png" alt="Monierate" width="35" class="hidden dark:inline"/>
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
                <input
                    type="password"
                    class="input"
                    id="login-password"
                    placeholder="Enter Password"
                />
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

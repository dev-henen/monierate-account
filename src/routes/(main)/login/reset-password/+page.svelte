<script>
</script>

<svelte:head>
    <title>Reset password - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
    <div
        class="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6 relative"
    >
        <div
            class="flex justify-between mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2"
        >
            <a
                href="/signup"
                class="button bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-center w-1/2 font-semibold"
            >
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
            <h2 class="text-xl font-semibold mb-4 inline">Reset password</h2>
        </div>

        <form class="space-y-4" on:submit={() => false}>
            <div>
                <label class="label" for="user-email">Email</label>
                <input
                    type="email"
                    class="input"
                    id="user-email"
                    placeholder="Enter your account email address"
                />
            </div>
            <button type="submit" class="button w-full mt-5">
                Next
            </button>
        </form>
    </div>
</div>

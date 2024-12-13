<script>
</script>

<svelte:head>
    <title>Verify OTP - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
    <div
        class="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6 relative"
    >
        <div
            class="flex justify-between mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2"
        >
            <a
                href="/login/reset-password"
                class="button bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-center w-1/2 font-semibold"
            >
                Go back
            </a>
            <a
                href="/login"
                class="button bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-center w-1/2 font-semibold"
            >
                Cancel
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
            <h2 class="text-xl font-semibold mb-4 inline">Verify OTP</h2>
        </div>

        <form class="space-y-4" on:submit={() => false}>
            <div>
                <label class="label" for="otp"
                    >Enter the code sent to your email address</label
                >
                <input
                    type="number"
                    class="input"
                    id="otp"
                    placeholder="Enter OTP"
                />
                <p class="text-sm text-gray-500">
                    <button class="bg-transparent hover:bg-transparent"
                        >Didn't get a code?</button
                    >
                </p>
            </div>

            <button type="submit" class="button w-full mt-5"> Continue </button>
        </form>
    </div>
</div>

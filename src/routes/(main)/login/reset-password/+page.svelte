<script lang="ts">
</script>

<svelte:head>
    <title>Reset password - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center md:min-h-screen">
    <div class="w-full max-w-[100%] md:max-w-[500px]">

        <div
            class="rounded-lg p-12 relative md:border md:dark:border-gray-700"
        >
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
                <h2 class="text-2xl font-semibold">Reset password</h2>
            </div>
    
            <div>
                <div>
                    <label class="label" for="login-email">Email</label>
                    <input
                        type="email"
                        class="input"
                        id="login-email"
                        placeholder="Email address"
                    />
                </div>
    
                <button class="button w-full"> Continue </button>
            </div>
        </div>
    
        <div class="w-full px-12 md:p-12 md:text-center">
            Or <a href="/login">Login</a>
        </div>
    </div>
</div>

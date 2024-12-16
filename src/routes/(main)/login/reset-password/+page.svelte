<script lang="ts">
</script>

<svelte:head>
    <title>Reset password - Monierate</title>
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
                <h2 class="text-xl font-semibold my-5">Reset password</h2>
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
    
                <button type="submit" class="button w-full"> Continue </button>
            </form>
        </div>
    
        <div class="w-full p-6 md:text-center">
            Or <a href="/login">Login</a>
        </div>
    </div>
</div>

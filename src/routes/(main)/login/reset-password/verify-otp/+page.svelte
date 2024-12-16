<script lang="ts">
</script>

<svelte:head>
    <title>Verify OTP - Monierate</title>
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
                <h2 class="text-xl font-semibold my-5">Verify OTP</h2>
            </div>
    
            <form class="space-y-4" on:submit={() => false}>
                <div>
                    <label class="label" for="otp">Enter the code sent to your email address</label>
                    <input
                        type="number"
                        class="input"
                        id="otp"
                        placeholder="OTP"
                    />
                </div>
    
               
    
                <div class="block text-sm text-gray-600 pb-8">
                    <a
                        href="#resend-otp"
                        class="text-blue-500">Didn't get a code?</a
                    >
                </div>
    
                <button type="submit" class="button w-full"> Continue </button>
            </form>
        </div>

        <div class="flex flex-col items-center justify-center mt-10">
            <p class="text-sm text-gray-500">Know your password?</p>
            <a href="/login" class="text-blue-500 text-sm">Login</a>
        </div>

    </div>
</div>

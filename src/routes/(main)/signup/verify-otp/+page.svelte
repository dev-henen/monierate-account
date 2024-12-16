<script lang="ts">
</script>

<svelte:head>
    <title>Verify OTP - Monierate</title>
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
                <h2 class="text-2xl font-semibold">Verify OTP</h2>
            </div>
    
            <div>
                <div class="mb-6">
                    <label class="label" for="otp">Enter the code sent to your email address</label>
                    <input
                        type="number"
                        class="input"
                        id="otp"
                        placeholder="OTP"
                    />
                </div>
    
               
    
                <div class="block text-sm text-gray-600 mb-6">
                    <a
                        href="#resend-otp"
                        class="text-blue-500">Didn't get a code?</a
                    >
                </div>
    
                <button class="button w-full"> Continue </button>
            </div>
        </div>

        <div class="w-full px-12 md:p-12 md:text-center">
            <p class="text-sm text-gray-500">Already have an account?</p>
            <a href="/login" class="text-blue-500 text-sm">Login</a>
        </div>

    </div>
</div>

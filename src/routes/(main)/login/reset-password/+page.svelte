<script lang="ts">
    import { setCookie } from "$lib/functions";
    import { goto } from "$app/navigation";

    let email: string = "";
    let emailError: string = "";
    let error: string = "";
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleResetPassword = async () => {
        emailError = email === "" ? "error" : "";
        error = "";

        if (emailError) {
            return;
        }

        if (!validateEmail.test(email)) {
            error = "Invalid email address";
        } else {
            setCookie("reset_password_email", email, 1);
            goto("/login/reset-password/create-new-password");
        }
    };
</script>

<svelte:head>
    <title>Reset password - Monierate</title>
</svelte:head>

<div class="flex items-center justify-center md:min-h-screen">
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
                <h2 class="text-2xl font-semibold">Reset password</h2>
            </div>

            <div>
                <span class="text-[0.9em] text-red-500 mb-6 block">
                    {error}
                </span>
                <div>
                    <label class="label" for="login-email">Email</label>
                    <input
                        type="email"
                        class="input {emailError}"
                        id="login-email"
                        placeholder="Email address"
                        bind:value={email}
                        on:change={() => (emailError = "")}
                    />
                </div>

                <button class="button w-full" on:click={handleResetPassword}>
                    Continue
                </button>
            </div>
        </div>

        <div class="w-full px-12 md:p-12 md:text-center">
            Or <a href="/login">Continue login</a>
        </div>
    </div>
</div>

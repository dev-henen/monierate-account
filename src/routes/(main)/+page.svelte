<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";

    let currentUser = $user;

    //console.log(currentUser)
</script>

<DashboardLayout title="dashboard">
    <div class="content py-20 text-center">
        <p class="text-gray-600 dark:text-gray-400">No data to show</p>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-md shadow-md mt-6">
        <h2 class="text-lg font-semibold mb-4">Next steps:</h2>

        <div class="space-y-4">
            <!-- Verified Step -->
            {#if currentUser.is_email_verified}
                <div class="flex items-center space-x-2">
                    <div
                        class="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full"
                    >
                        <i class="fas fa-check text-green-600"></i>
                    </div>
                    <span class="text-gray-80 dark:text-gray-400 font-medium"
                        >Verify your email address</span
                    >
                </div>
            {:else}
                <div
                    class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                >
                    <span class="text-gray-80 dark:text-gray-400 font-medium">
                        <a href="/#" class="font-medium hover:underline"
                            >Verify your email address</a
                        >
                    </span>
                    <a href="/#" class="font-medium hover:underline">→</a>
                </div>
            {/if}

            <!-- Add Backup Contact -->
            {#if currentUser.is_phone_verified}
                <div class="flex items-center space-x-2">
                    <div
                        class="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full"
                    >
                        <i class="fas fa-check text-green-600"></i>
                    </div>
                    <span class="text-gray-80 dark:text-gray-400 font-medium"
                        >Add backup contact information</span
                    >
                </div>
            {:else}
                <div
                    class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                >
                    <span class="text-gray-80 dark:text-gray-400 font-medium">
                        <a href="/#" class="font-medium hover:underline"
                            >Add backup contact information</a
                        >
                    </span>
                    <a href="/#" class="font-medium hover:underline">→</a>
                </div>
            {/if}

            <!-- API Request Step -->
            {#if currentUser.usage.requests_made_since_history > 0}
                <div class="flex items-center space-x-2">
                    <div
                        class="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full"
                    >
                        <i class="fas fa-check text-green-600"></i>
                    </div>
                    <span class="text-gray-80 dark:text-gray-400 font-medium"
                        >Grab your App ID and make your first API request</span
                    >
                </div>
            {:else}
                <div
                    class="flex items-center justify-between bg-green-50 dark:bg-gray-700 p-4 rounded-md"
                >
                    <span class="text-gray-80 dark:text-gray-400 font-medium">
                        <a href="/#" class="font-medium hover:underline"
                            >Grab your App ID</a
                        >
                        and
                        <a href="/#" class="font-medium hover:underline"
                            >make your first API request</a
                        >
                    </span>
                    <a href="/#" class="font-medium hover:underline">→</a>
                </div>
            {/if}

            <div class="mt-6 border-t dark:border-gray-700 py-5 text-sm">
                <p class="text-gray-500 dark:text-gray-200 font-bold mb-3">
                    Questions about our services? Need help getting started?
                </p>
                <p class="text-gray-700 dark:text-gray-400">
                    If you want to know more about our services, or discuss your API
                    integration, please don't hesitate to
                    <a href="/#" class="font-medium hover:underline">get in touch</a
                    > and we'll be happy to help.
                </p>
            </div>
        </div>
    </div>
</DashboardLayout>

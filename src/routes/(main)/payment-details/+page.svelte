<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { notify } from "$lib/notification";
    import { goto } from "$app/navigation";
    import { getMonthAndYear } from "$lib/functions";

    export let data;
    let subscriptions = data.subscriptions;
    let currencySymbols: any = data.currencySymbols;
    let currentUser = $user;
    console.log(currentUser)
    let billingContactEmail = currentUser.billing_contact_email || "";
    let paymentMethod = "Visa ending in 0000";
    let billingInfo = {
        name: `${currentUser.firstname + currentUser.lastname || 'Not set'}`,
        email: currentUser.email || 'Not set',
        details: "No billing details available",
    };

    let currentOptionHiderEvent: ((event: MouseEvent) => void) | null = null;

    function openInvoiceHistoryDropdown(index: number) {
        document.querySelectorAll(".invoice-history-dropdown").forEach((el) => {
            el.classList.add("hidden");
        });

        const currentOption = document.querySelector(
            `.invoice-history-dropdown.index-${index}`,
        );
        if (!currentOption) return;

        currentOption.classList.remove("hidden");

        if (currentOptionHiderEvent) {
            window.removeEventListener("click", currentOptionHiderEvent);
        }

        const hideDropdown = (event: MouseEvent) => {
            if (!currentOption.contains(event.target as Node)) {
                currentOption.classList.add("hidden");
                window.removeEventListener("click", hideDropdown);
                currentOptionHiderEvent = null;
            }
        };

        currentOptionHiderEvent = hideDropdown;
        setTimeout(
            () => window.addEventListener("click", currentOptionHiderEvent!),
            0,
        );
    }
</script>

<DashboardLayout title="payment details">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">Payment details</h2>
        <p class="mb-4" id="return-angle">
            These are the payment details we have on file for you. Please make
            any changes below and click 'Save' before exiting this page.
        </p>

        <div class="mb-16 py-4">
            <div class="content self">
                <h2 class="text-lg font-semibold mb-6">Plan</h2>
                <div class="space-y-2 mb-8">
                    <div class="flex items-center">
                        <span class="w-1/3 font-bold">Current plan:</span>
                        <span class="font-medium flex items-center gap-2">
                            <span>
                                {currentUser.plan.name}
                            </span>
                        </span>
                    </div>
                </div>
                <a
                    href="/subscription"
                    class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                >
                    Update Plan
                </a>
            </div>

            <!-- <div class="mb-16 py-4">
            <div class="content self">
                <h2 class="text-lg font-semibold mb-6">Payment Information</h2>
                <div class="space-y-2 mb-8">
                    <div class="flex items-center">
                        <span class="w-1/3">Payment method:</span>
                        <span class="font-medium flex items-center gap-2">
                            <img
                                src="/icons/visa.png"
                                width="30"
                                height="30"
                                alt="visa logo"
                            />
                            <span>
                                {paymentMethod}
                            </span>
                        </span>
                    </div>
                </div>
                <button
                    class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                >
                    Change payment method
                </button>
            </div> -->

            <!-- <div class="content self">
                <h2 class="text-lg font-semibold mb-6">Billing Information</h2>
                <div class="space-y-2 mb-8">
                    <div class="flex items-center">
                        <span class="w-1/3">Name:</span>
                        <span class="font-medium">{billingInfo.name}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="w-1/3">Email:</span>
                        <span class="font-medium">{billingInfo.email}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="w-1/3">Details:</span>
                        <span class="font-medium">{billingInfo.details}</span>
                    </div>
                </div>
                <a
                    href="/edit-account-details"
                    class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                >
                    Edit billing information
                </a>
            </div> -->

            <div class="content self">
                <h2 class="text-lg font-semibold mb-2">Invoice History</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    View and download your previous invoices.
                </p>

                <div>
                    {#if subscriptions.length > 0}
                        <div class="flex items-center border-b dark:border-gray-600 py-3 text-sm">
                            <div class="w-1/3">DATE</div>
                            <div class="w-2/3">STATUS</div>
                            <div class="w-1/3 text-right pr-10">AMOUNT</div>
                        </div>
                        {#each subscriptions.slice(0, 3) as subscription, i}
                            <div
                                class="flex items-center border-b dark:border-gray-600 py-3"
                            >
                                <!-- Date -->
                                <div class="text-sm font-medium w-1/3">
                                    <a href="/payment-details/${subscription._id}" class="text-dark dark:text-gray-200 underline">
                                        {getMonthAndYear(subscription.updated_at)}
                                    </a>
                                </div>

                                <!-- Status -->
                                <div class="flex items-center space-x-2 w-2/3">
                                    <span
                                        class="px-2 py-1 text-xs font-medium {subscription.payment_status ===
                                        'paid'
                                            ? 'bg-green-100 text-green-700 dark:bg-gray-100 dark:text-gray-700'
                                            : 'bg-red-100 text-red-700'} rounded"
                                    >
                                        <i
                                            class="fa {subscription.payment_status ===
                                            'paid'
                                                ? 'fa-check'
                                                : 'fa-close'} px-1"
                                        ></i>
                                        {subscription.payment_status}
                                    </span>
                                </div>

                                <div class="flex justify-end w-1/3">
                                    <!-- Amount -->
                                    <div class="text-sm font-medium mr-10">
                                    {currencySymbols[subscription.amount.unit]
                                        ? `${currencySymbols[subscription.amount.unit]}${subscription.amount.value.toFixed(2)}`
                                        : `${subscription.amount.value}${subscription.amount.unit}`}
                                    </div>
                                    <!-- More options -->
                                    <span class="relative">
                                        <button
                                            class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            aria-label="More options"
                                            on:click={() => {
                                                openInvoiceHistoryDropdown(i);
                                            }}
                                        >
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>
                                        <span
                                            class="hidden z-10 absolute right-0 bottom-[-45px] p-2 bg-white dark:bg-gray-900 shadow rounded-tl-lg rounded-bl-lg rounded-br-lg transition-all ease-in-out duration-300 invoice-history-dropdown index-{i}"
                                        >
                                            {#if subscription.payment_status === "paid"}
                                                <button
                                                    class="w-full px-6 py-2 text-xs font-medium border-b border-gray-500 rounded whitespace-nowrap text-left"
                                                    on:click={() => {
                                                        goto(
                                                            `/payment-details/${subscription._id}#download`,
                                                        );
                                                    }}
                                                >
                                                    Download invoice
                                                </button>
                                                <button
                                                    class="w-full px-6 py-2 text-xs font-medium border-b border-gray-500 rounded whitespace-nowrap text-left"
                                                    on:click={() => {
                                                        goto(
                                                            `/payment-details/${subscription._id}`,
                                                        );
                                                    }}
                                                >
                                                    View invoice
                                                </button>
                                            {:else}
                                                <button
                                                    class="w-full px-6 py-2 text-xs font-medium border-b border-gray-500 rounded whitespace-nowrap text-left"
                                                    on:click={() => {
                                                        window.location.href = `${subscription.payment_link}`;
                                                    }}
                                                >
                                                    Continue and pay
                                                </button>
                                            {/if}
                                        </span>
                                    </span>
                                </div>

                            </div>
                        {/each}
                    {:else}
                        <div
                            class="flex flex-col items-center justify-center h-full"
                        >
                            <span class="text-gray-500 dark:text-gray-400"
                                >No subscriptions found</span
                            >
                        </div>
                    {/if}
                </div>

                <div class="mt-8">
                    <a
                        href="/billing-history"
                        class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                    >
                        View More
                    </a>
                </div>
            </div>
        </div>
    </div>
</DashboardLayout>

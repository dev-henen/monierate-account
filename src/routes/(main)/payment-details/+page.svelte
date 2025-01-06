<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { notify } from "$lib/notification";
    import { goto } from "$app/navigation";

    let currentUser = $user;
    let billingContactEmail = currentUser.billing_contact_email || "";

    let paymentMethod = "Visa ending in 0000";
    let billingInfo = {
        name: "ikwu624",
        email: "ikwu624@gmail.com",
        details: "No billing details set",
    };

    let invoices = [
        { date: "December 2024", status: "Paid", amount: "$16.11" },
        { date: "October 2024", status: "Paid", amount: "$13.74" },
        { date: "September 2024", status: "Paid", amount: "$12.85" },
    ];

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

<DashboardLayout title="edit account details">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">Payment details</h2>
        <p class="mb-4" id="return-angle">
            These are the payment details we have on file for you. Please make
            any changes below and click 'Save' before exiting this page.
        </p>

        <div class="mb-16 py-4">
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
            </div>

            <div class="content self">
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
                <button
                    class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                >
                    Edit billing information
                </button>
            </div>

            <div class="content self">
                <h2 class="text-lg font-semibold mb-2">Invoice History</h2>
                <p class="text-sm text-gray-600 mb-4">
                    View and download your previous invoices.
                </p>

                <div class="space-y-4">
                    {#each invoices as invoice, i}
                        <div
                            class="flex items-center border-b dark:border-gray-600 pb-2"
                        >
                            <!-- Date -->
                            <div class="text-sm font-medium w-1/3">
                                {invoice.date}
                            </div>

                            <!-- Status -->
                            <div class="flex items-center space-x-2 w-1/3">
                                <span
                                    class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded"
                                >
                                    <i class="fa fa-check"></i>
                                    {invoice.status}
                                </span>
                            </div>

                            <!-- Amount -->
                            <div class="text-sm font-medium w-1/3">
                                {invoice.amount}
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
                                    <button
                                        class="w-full px-6 py-2 text-xs font-medium border-b border-gray-500 rounded whitespace-nowrap text-left"
                                    >
                                        Download invoice
                                    </button>
                                    <button
                                        class="w-full px-6 py-2 text-xs font-medium border-b border-gray-500 rounded whitespace-nowrap text-left"
                                    >
                                        View invoice
                                    </button>
                                </span>
                            </span>
                        </div>
                    {/each}
                </div>

                <div class="mt-8">
                    <button
                        class="button bg-transparent border border-gray-300 text-gray-500 dark:border-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-500"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    </div>
</DashboardLayout>

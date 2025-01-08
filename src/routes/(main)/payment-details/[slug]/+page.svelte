<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";

    export let data;
    let subscription = data.subscription;
    let currentUser = $user;

 

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

    const downloadInvoice = () => {
        const element = document.getElementById("payment-invoice") || "";
        const opt = {
            margin: [10, 10, 10, 10],
            filename: "monierate-invoice.pdf",
            html2canvas: { scale: 4 }, // Adjust the scale if needed
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(opt).save();
    };

</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"
    ></script>
</svelte:head>

<DashboardLayout title="invoice">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">Invoice details</h2>
        <p class="mb-4" id="return-angle">
            Here are the payment details for this invoice. Please review them
            for your reference.
        </p>

        <div
            class="max-w-4xl mt-8 p-3 md:p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
            id="payment-invoice"
        >
            <!-- Logo and Invoice Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start mb-12"
            >
                <div class="space-y-8 md:space-y-2">
                    <div
                        class="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        <img
                            src="/monierate-logo.png"
                            alt="Monierate"
                            class="h-8 dark:hidden"
                        />
                        <img
                            src="/monierate-logo-white.png"
                            alt="Monierate"
                            class="h-8 hidden dark:inline-block"
                        />
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        <p>Bit54</p>
                        <p>3 Rabat Street Wuse Zone 6</p>
                        <p>FCT Abuja, Nigeria 900286</p>
                    </div>
                </div>
                <div class="md:text-right mt-8 md:mt-0">
                    <h1
                        class="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        INVOICE
                    </h1>
                    <div class="space-y-1 text-sm">
                        <p class="text-gray-600 dark:text-gray-400">
                            Invoice #: <span
                                class="font-medium text-gray-900 dark:text-white"
                                >{subscription._id}</span
                            >
                        </p>
                        <p class="text-gray-600 dark:text-gray-400">
                            Reference: <span
                                class="font-medium text-gray-900 dark:text-white"
                                >{subscription.reference}</span
                            >
                        </p>
                        <p class="text-gray-600 dark:text-gray-400">
                            Issue Date: <span
                                class="font-medium text-gray-900 dark:text-white"
                                >{new Date(
                                    subscription.created_at,
                                ).toLocaleDateString()}</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-8">
                    <!-- Customer Information -->
                    <div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h2
                            class="text-lg font-semibold mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Customer Information
                        </h2>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                User ID: <span
                                    class="font-medium text-gray-900 dark:text-white"
                                    >{subscription.user}</span
                                >
                            </p>
                        </div>
                    </div>

                    <!-- Plan Details -->
                    <div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h2
                            class="text-lg font-semibold mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Plan Details
                        </h2>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                Plan ID: <span
                                    class="font-medium text-gray-900 dark:text-white"
                                    >{subscription.plan}</span
                                >
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                Units: <span
                                    class="font-medium text-gray-900 dark:text-white"
                                    >{subscription.units}</span
                                >
                            </p>
                            <div
                                class="mt-4 p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                            >
                                <p
                                    class="text-xs uppercase text-gray-500 dark:text-gray-400"
                                >
                                    Subscription Period
                                </p>
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white mt-1"
                                >
                                    {new Date(
                                        subscription.start_date,
                                    ).toLocaleDateString()} - {new Date(
                                        subscription.end_date,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-8">
                    <!-- Payment Information -->
                    <div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h2
                            class="text-lg font-semibold mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                            Payment Details
                        </h2>
                        <div class="space-y-4">
                            <div
                                class="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                            >
                                <span
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                    >Amount</span
                                >
                                <span
                                    class="text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    {subscription.amount.value}
                                    {subscription.amount.unit}
                                </span>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div
                                    class="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                                >
                                    <p
                                        class="text-xs uppercase text-gray-500 dark:text-gray-400"
                                    >
                                        Payment Channel
                                    </p>
                                    <p
                                        class="text-sm font-medium text-gray-900 dark:text-white mt-1"
                                    >
                                        {subscription.payment_channel}
                                    </p>
                                </div>
                                <div
                                    class="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                                >
                                    <p
                                        class="text-xs uppercase text-gray-500 dark:text-gray-400"
                                    >
                                        Status
                                    </p>
                                    <p
                                        class="text-sm font-medium text-gray-900 dark:text-white mt-1 capitalize"
                                    >
                                        {subscription.payment_status}
                                    </p>
                                </div>
                            </div>
                            <div
                                class="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                            >
                                <p
                                    class="text-xs uppercase text-gray-500 dark:text-gray-400"
                                >
                                    Payment Reference
                                </p>
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white mt-1 break-all"
                                >
                                    {subscription.payment_reference}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Payment / Download Action -->
                    {#if subscription.payment_status !== "paid"}
                        <div
                            class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                            <h2 class="text-lg font-semibold mb-4">
                                Payment Link
                            </h2>
                            <a
                                href={subscription.payment_link}
                                class="inline-flex w-full justify-center items-center px-6 py-3 button"
                            >
                                Continue to Payment
                                <svg
                                    class="ml-2 -mr-1 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    {:else}
                        <div
                            class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            id="download"
                        >
                            <h2 class="text-lg font-semibold mb-4">
                                Download Link
                            </h2>
                            <button
                                class="inline-flex w-full justify-center items-center px-6 py-3 button"
                                on:click={downloadInvoice}
                            >
                                Download invoice
                                <svg
                                    class="ml-2 -mr-1 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    {/if}
                </div>
            </div>

            <div
                class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
                <p class="text-sm text-center text-gray-500 dark:text-gray-400">
                    Thank you. If you have any questions, please contact our
                    support team.
                </p>
            </div>
        </div>
    </div>
</DashboardLayout>

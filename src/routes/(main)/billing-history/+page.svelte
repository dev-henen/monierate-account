<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { notify } from "$lib/notification";
    import { goto } from "$app/navigation";
    import { friendlyDate } from "$lib/functions";

    type SubscriptionsNavigation = "next" | "previous" | "start" | "end";

    export let data;
    let subscriptions = data.subscriptions;
    let currencySymbols: any = data.currencySymbols;
    let currentUser = $user;
    let currentOptionHiderEvent: ((event: MouseEvent) => void) | null = null;
    let displayLimit: number = 10;
    let displayOffset: number = 0;

    function navigateSubscriptions(index: SubscriptionsNavigation) {
        switch (index) {
            case "next":
                displayOffset += displayLimit;
                break;
            case "previous":
                displayOffset -= displayLimit;
                break;
            case "start":
                displayOffset = 0;
                break;
            case "end":
                displayOffset = subscriptions.length - displayLimit;
                break;
        }
    }

    function isDisabled(button: SubscriptionsNavigation) {
        const maxOffset = Math.max(0, subscriptions.length - displayLimit);

        switch (button) {
            case "next":
                return displayOffset >= maxOffset;
            case "previous":
                return displayOffset === 0;
            case "start":
                return displayOffset === 0;
            case "end":
                return displayOffset >= maxOffset;
        }
    }

    $: visibleSubscriptions = subscriptions.slice(
        displayOffset,
        displayOffset + displayLimit,
    );

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

<DashboardLayout title="billing history">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">Billing history</h2>
        <p class="mb-4" id="return-angle">
            Below is your billing history, including paid and unpaid invoices.
            You can view, download, or pay any outstanding invoices as needed.
        </p>

        <div class="space-y-4 content self mt-20">
            {#if subscriptions.length > 0}
                {#each visibleSubscriptions as subscription, i}
                    <div
                        class="flex items-center {i <
                        visibleSubscriptions.length - 1
                            ? 'border-b dark:border-gray-600'
                            : ''} pb-2"
                    >
                        <!-- Date -->
                        <div class="text-sm font-medium w-1/3">
                            {friendlyDate(subscription.updated_at)}
                        </div>

                        <!-- Status -->
                        <div class="flex items-center space-x-2 w-1/3">
                            <span
                                class="px-2 py-1 text-xs font-medium {subscription.payment_status ===
                                'paid'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'} rounded"
                            >
                                <i
                                    class="fa {subscription.payment_status ===
                                    'paid'
                                        ? 'fa-check-circle'
                                        : 'fa-close'}"
                                ></i>
                                {subscription.payment_status}
                            </span>
                        </div>

                        <!-- Amount -->
                        <div class="text-sm font-medium w-1/3">
                            {currencySymbols[subscription.amount.unit]
                                ? `${currencySymbols[subscription.amount.unit]}${subscription.amount.value}`
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
                {/each}
            {:else}
                <div class="flex flex-col items-center justify-center h-full">
                    <span class="text-gray-500 dark:text-gray-400"
                        >No subscriptions found</span
                    >
                </div>
            {/if}
        </div>

        <div
            class="flex justify-center md:justify-start align-center gap-2 mt-4"
        >
            <button
                class="button"
                on:click={() => navigateSubscriptions("start")}
                disabled={isDisabled("start")}>Start</button
            >
            <button
                class="button"
                on:click={() => navigateSubscriptions("previous")}
                disabled={isDisabled("previous")}>Previous</button
            >
            <button
                class="button"
                on:click={() => navigateSubscriptions("next")}
                disabled={isDisabled("next")}>Next</button
            >
            <button
                class="button"
                on:click={() => navigateSubscriptions("end")}
                disabled={isDisabled("end")}>End</button
            >
        </div>
    </div>
</DashboardLayout>

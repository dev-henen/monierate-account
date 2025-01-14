<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { formatISODateTime } from "$lib/functions";
    import { formatNumber } from "$lib/functions";

    export let data: any;
    let currencySymbols: any = data.currencySymbols;
    let subscriptionPlans: any = data.subscriptionPlans;
    let currentUser = $user;
</script>

<DashboardLayout title="subscription plan">
    <div class="content mb-20">
        <h2 class="text-2xl font-semibold mb-8">Subscription Plan</h2>
        {#if currentUser.plan}
            <p class="mb-4" id="return-angle">
                You're subscribed to the {currentUser.plan.name} Plan.
            </p>
            <p class="mb-8">
                You can change your subscription plan by choosing one of the
                options below.
            </p>
        {/if}
    </div>

    <div class="content grid md:grid-cols-3 gap-10">
        {#if subscriptionPlans}
            {#each subscriptionPlans.sort((a:any, b:any) => b.price - a.price) as plan}
                <div
                    class="border dark:border-gray-500 rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300 {plan.code ===
                    'free'
                        ? 'md:col-span-3 md:place-self-center'
                        : ''}"
                >
                    <div class="text-center">
                        <h2
                            class="text-lg font-bold uppercase text-gray-800 dark:text-gray-200"
                        >
                            {plan.name}
                        </h2>
                        <p
                            class="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100"
                        >
                            {currencySymbols[plan.currency]
                                ? currencySymbols[plan.currency]
                                : plan.currency}{formatNumber(plan.price)}<span
                                class="text-base font-medium text-gray-600 dark:text-gray-300"
                                >/{plan.billing_cycle}</span
                            >
                        </p>
                    </div>
                    <ul class="mt-6 space-y-4">
                        <!-- <li
                            class="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="font-medium"
                                >{formatNumber(plan.requests_credit_per_month)} request
                                <b>credit per month</b></span
                            >
                        </li> -->
                        <li
                            class="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="font-medium"
                                >{formatNumber(plan.requests_limit_per_month)} request
                                <b>per month</b></span
                            >
                        </li>
                        <li
                        class="flex items-center text-gray-700 dark:text-gray-300">
                            {#if plan.features.minute_updates}
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="font-medium">
                                    {formatNumber(plan.features.minute_updates)} <b>minute updates</b>
                                </span>
                            {:else}
                                <i class="fas fa-times text-red-500 ml-1 mr-3"></i>
                                <span class="font-medium">
                                    no <b>limit updates</b>
                                </span>
                            {/if}
                        </li>
                        <li
                            class="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="font-medium"
                                >{formatNumber(plan.requests_limit_per_minute)} request
                                <b>limit per minute</b></span
                            >
                        </li>
                        <li
                            class="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            {#if plan.features.supports_premium_currencies === true}
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="font-medium">
                                    supports <b>premium currencies</b>
                                </span>
                            {:else}
                                <i class="fas fa-times text-red-500 ml-1 mr-3"
                                ></i>
                                <span class="font-medium">
                                    does not support <b>premium currencies</b>
                                </span>
                            {/if}
                        </li>
                        <li
                            class="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            {#if plan.features.custom_reports === true}
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="font-medium">
                                    with <b>custom historical reports</b>
                                </span>
                            {:else}
                                <i class="fas fa-times text-red-500 ml-1 mr-3"
                                ></i>
                                <span class="font-medium">
                                    no <b>custom historical reports</b>
                                </span>
                            {/if}
                        </li>
                    </ul>
                    <div class="mt-6">
                        {#if plan.code === currentUser.plan.code}
                            <div class="text-gray-500 text-sm text-center py-2">
                                You are currently subscribed to this plan
                            </div>
                        {:else}
                            <a
                                href="/subscription/{plan._id}"
                                class="w-full button block text-center"
                                >Select Plan</a
                            >
                            <p
                                class="mt-2 text-center text-sm text-gray-600 dark:text-gray-300"
                            >
                                (You will be able to confirm on next page)
                            </p>
                        {/if}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</DashboardLayout>

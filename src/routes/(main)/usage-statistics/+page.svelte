<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { formatISODateTime, formatNumber } from "$lib/functions";
    import Chart from "chart.js/auto";
    import { onMount, onDestroy } from "svelte";

    let currentUser: any = $user;

    function calculateMonthlyUsagePercentage(data: any): {
        remainingPercentage: number;
        usedPercentage: number;
    } {
        const { plan, usage } = data;
        const { requests_limit_per_month } = plan;
        const { requests_made_this_month } = usage;

        const usedPercentage =
            (requests_made_this_month / requests_limit_per_month) * 100;
        const remainingPercentage = 100 - usedPercentage;

        return {
            remainingPercentage: Math.max(remainingPercentage, 0),
            usedPercentage: Math.min(usedPercentage, 100),
        };
    }
    const getMonthlyUsagePercentage =
        calculateMonthlyUsagePercentage(currentUser);

    let canvas: HTMLCanvasElement;

    let chart: Chart;

    onMount(() => {
        const totalMonthlyRequests = currentUser.plan.requests_limit_per_month;
        const requestsMadeThisMonth =
            currentUser.usage.requests_made_this_month;
        const requestsMadeThisDay = currentUser.usage.requests_made_this_day;
        const creditBalance = currentUser.usage.credit_balance;
        const failedRequests = currentUser.usage.failed_requests;

        const gradientColors = (ctx: any, color1: any, color2: any) => {
            const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                ctx.canvas.height,
            );
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            return gradient;
        };

        const ctx = canvas.getContext("2d");

        chart = new Chart(canvas, {
            type: "bar",
            data: {
                labels: [
                    "Monthly Limit",
                    "Daily Usage",
                    "Credit Balance",
                    "Failed Requests",
                ],
                datasets: [
                    {
                        label: "Usage Statistics",
                        data: [
                            (requestsMadeThisMonth / totalMonthlyRequests) *
                                100, // Monthly usage in %
                            requestsMadeThisDay, // Daily usage (raw value)
                            creditBalance, // Credit balance
                            failedRequests, // Failed requests
                        ],
                        backgroundColor: [
                            gradientColors(ctx, "#4caf50", "#81c784"), // Monthly
                            gradientColors(ctx, "#2196f3", "#64b5f6"), // Daily
                            gradientColors(ctx, "#ffeb3b", "#fff176"), // Credit
                            gradientColors(ctx, "#f44336", "#e57373"), // Failed
                        ],
                        borderWidth: 0,
                        borderRadius: 15,
                        barThickness: 50,
                        hoverBackgroundColor: [
                            "#388e3c", // Monthly hover
                            "#1976d2", // Daily hover
                            "#fbc02d", // Credit hover
                            "#d32f2f", // Failed hover
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        titleFont: {
                            size: 14,
                            weight: "bold",
                        },
                        bodyFont: {
                            size: 12,
                        },
                        callbacks: {
                            label: function (context: any) {
                                let label = context.dataset.label || "";
                                if (label) {
                                    label += ": ";
                                }
                                label += context.raw.toLocaleString();
                                if (context.dataIndex === 0) {
                                    label += "%";
                                }
                                return label;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Values",
                            font: {
                                size: 14,
                                weight: "bold",
                            },
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1,
                        },
                        ticks: {
                            font: {
                                size: 12,
                            },
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Metrics",
                            font: {
                                size: 14,
                                weight: "bold",
                            },
                        },
                        grid: {
                            display: false,
                        },
                        ticks: {
                            font: {
                                size: 12,
                            },
                        },
                    },
                },
                animation: {
                    duration: 1000,
                    easing: "easeOutBounce",
                },
            },
        });
    });

    // Cleanup chart instance
    onDestroy(() => {
        chart?.destroy();
    });
</script>

<DashboardLayout title="API Usage Statistics">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-4">API Usage Statistics</h2>
        <div class="mb-4">
            Here you can view your recent API usage statistics, including daily
            values, month-to-date total and the daily average for your App ID.
            Usage information may be delayed up to 15 minutes.
            <a href="/#">Learn more about API requests →</a>
        </div>
    </div>

    <div class="content">
        <h3 class="text-2xl font-semibold mb-4">Current Period Usage</h3>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
                {#if currentUser.plan.updated_at}
                    <div class="mb-6">
                        You've made <strong
                            >{currentUser.plan.requests_made_since_history > 0
                                ? formatNumber(
                                      currentUser.plan
                                          .requests_made_since_history,
                                  )
                                : "zero"}</strong
                        >
                        API requests since your current month, started on
                        <strong
                            >{formatISODateTime(
                                currentUser.plan.updated_at,
                            )}</strong
                        >.
                    </div>
                {/if}
                <div class="mb-6">
                    Your monthly request allowance is <strong>
                        {formatNumber(
                            currentUser.plan.requests_limit_per_month,
                        )}</strong
                    >.
                </div>
            </div>
            <div class="flex-1">
                <div class="mb-4 flex items-center gap-2">
                    <span>{getMonthlyUsagePercentage.usedPercentage}%</span>
                    <div class="w-[95%] flex">
                        <div class="h-[32px] bg-gray-500 rounded w-full">
                            <div
                                class="h-[32px] bg-blue-500 rounded w-[{getMonthlyUsagePercentage.usedPercentage}%]"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <h3 class="text-2xl font-semibold mb-4">API Activity Breakdown</h3>
        <p class="mb-4">
            This chart displays your account activity for the previous 60-day
            period.
        </p>
        <div class="h-[300px] my-20">
            <canvas bind:this={canvas}></canvas>
        </div>
    </div>
    
    <div class="content">
        <h3 class="text-2xl font-semibold mb-6">Frequently Answered Question</h3>
        <h3 class="text-xl font-semibold mb-6">What counts as one API request?</h3>
        <ul class="ml-2 mb-6">
            <li class="mb-4">Each HTTP request to our latest.json, historical/*.json and /convert API endpoints counts as a single request towards your usage quota regardless of the number of currencies or data points returned.</li>
            <li class="mb-4">Requests to our currencies.json and usage.json API endpoints are 'free', and don't count towards your quota.</li>
            <li class="mb-4">Requests to our time-series.json API endpoint count as a single request for each day of data returned. For example, a time-series request for two weeks of historical exchange rate information will count as 14 API requests.</li>
        </ul>
        <h3 class="text-xl font-semibold mb-6">What happens if I go over my allowance?</h3>
        <p class="mb-6">If you exceed your API request allowance in a given period, we'll get in touch via email to discuss ways we can keep supporting you. You may choose to lower your usage or subscribe to a plan with a higher monthly request volume. Your app ID and any connected integrations will remain active (we won't restrict access without attempting to make contact several times first).</p>
        <p class="mb-6">If we don't hear back from you after reaching out several times (or if your usage volume stays over the quota for two months or more) we may then restrict your access. You can restore your access by contacting us.</p>
    </div>
</DashboardLayout>

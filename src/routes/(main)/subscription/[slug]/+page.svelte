<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import { user } from "$lib/stores/user";
    import { formatNumber, setCookie, getCookie } from "$lib/functions";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { notify } from "$lib/notification";

    export let data: any;
    let subscriptionPlans = data.subscriptionPlans;
    let currentUser = $user;
    let selectedPlanID = data.slug;
    let paymentMethod = "stripe";
    let billingCircle = "monthly";
    let paymentLink = "";
    let paymentReference = "";
    let openDialogs = {
        confirmSubscription: false,
        continueUnpaidSubscription: false,
    };

    const getSelectedSubscriptionPlan = subscriptionPlans.find(
        (plan: any) => plan._id === selectedPlanID,
    );

    const setPaymentMethod = (method: string) => (paymentMethod = method);
    const setBillingCircle = (circle: string) => (billingCircle = circle);
    const toggleDialog = (key: keyof typeof openDialogs, isOpen: boolean) => {
        openDialogs[key] = isOpen;
    };

    const handleAPIResponse = async (
        url: string,
        body: Record<string, any>,
    ) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            notify("An unknown error occurred, please try again later.");
            return null;
        }
    };

    const createSubscription = async () => {
        const data = await handleAPIResponse("/api/users/create_subscription", {
            planID: getSelectedSubscriptionPlan?.code,
            paymentMethod,
            billingCircle,
            redirectUrl: window.location.href,
        });

        if (data?.status === "success") {
            setCookie(
                `subscription_reference_${selectedPlanID}`,
                data.data.reference,
                1,
            );
            window.location.href = data.data.payment_link;
        } else {
            notify(data?.description || "Could not create subscription.");
        }
    };

    const confirmSubscription = async (subscription_reference: string) => {
        const data = await handleAPIResponse(
            "/api/users/confirm_subscription",
            {
                subscription_reference,
            },
        );

        if (data?.status === "success") {
            const result = data.data;
            if (result.status === "active") {
                notify("Subscription created successfully.");
                window.location.replace("/subscription");
            } else if (result.status === "pending") {
                notify(
                    "Subscription is still pending. No payment has been initiated.",
                );
                paymentLink = result.payment_link;
                paymentReference = result.reference;
                toggleDialog("continueUnpaidSubscription", true);
            }
        } else {
            notify(
                data?.description ||
                    "Could not verify subscription. Please contact support.",
            );
        }
        toggleDialog("confirmSubscription", false);
    };

    const continueUnpaidSubscription = () => {
        setCookie(
            `subscription_reference_${selectedPlanID}`,
            paymentReference,
            1,
        );
        window.location.href = paymentLink;
    };
    const cancelUnpaidSubscription = () => {
        setCookie(`subscription_reference_${selectedPlanID}`, "", -1);
    };

    onMount(async () => {
        if (!getSelectedSubscriptionPlan) {
            return goto("/subscription");
        }

        const subscriptionReference = getCookie(
            `subscription_reference_${selectedPlanID}`,
        );
        if (subscriptionReference) {
            toggleDialog("confirmSubscription", true);
            await confirmSubscription(subscriptionReference);
            cancelUnpaidSubscription(); // Clear the cookie after confirming the subscription
        }
    });
</script>

<DashboardLayout title="Subscription Plan / One Last Step">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-8">One Last Step</h2>
        <p class="mb-8">
            Please finish setting up your subscription by paying
            {formatNumber(getSelectedSubscriptionPlan.price)}
            {getSelectedSubscriptionPlan.currency} monthly for your
            {getSelectedSubscriptionPlan.name} subscription.
        </p>
        <p class="mb-4 text-2xl font-semibold">
            {getSelectedSubscriptionPlan.name} Plan
        </p>
        <!-- <p class="mb-6">Billing cycle:</p>
        <div class="mb-6">
            <input
                type="radio"
                id="monthly"
                name="billingCircle"
                value="monthly"
                class="inline-block mr-1 transform scale-150 cursor-pointer"
                checked
                on:click={() => setBillingCircle("monthly")}
            />
            <label for="monthly" class="mr-2 label inline-block">
                Monthly ({formatNumber(getSelectedSubscriptionPlan.price)}
                {getSelectedSubscriptionPlan.currency})
            </label>
            <input
                type="radio"
                id="yearly"
                name="billingCircle"
                value="yearly"
                class="inline-block mr-1 transform scale-150 cursor-pointer"
                on:click={() => setBillingCircle("yearly")}
            />
            <label for="yearly" class="label inline-block">
                Yearly ({formatNumber(getSelectedSubscriptionPlan.price * 12)}
                {getSelectedSubscriptionPlan.currency})
            </label>
        </div> -->
    </div>

    <div class="content">
        <p class="mb-6">How do you want to pay?</p>
        <div class="w-full md:w-1/3">
            <button
                class={`block w-full border dark:border-gray-500 rounded-lg p-1 cursor-pointer flex items-center justify-between gap-4 hover:border-blue-500 ${
                    paymentMethod === "stripe" ? "ring" : ""
                } transition`}
                on:click={() => setPaymentMethod("stripe")}
            >
                <span class="font-medium inline px-2">Credit Card</span>
                <img
                    src="/icons/stripe-payment.png"
                    alt="Stripe"
                    class="h-12"
                />
            </button>
        </div>
    </div>

    <div class="content">
        <button class="button w-full md:w-1/3" on:click={createSubscription}
            >Pay Now</button
        >
        <div class="mt-8">
            Review or change your subscription?
            <a href="/subscription">Click here</a> to go to subscription plans.
        </div>
    </div>

    <Dialog
        bind:isOpen={openDialogs}
        id="confirmSubscription"
        title="Confirming Subscription"
        contentCenter
        hideCancelButton
        hideCancelTimes
        overlayClick={false}
    >
        <div class="loader"></div>
        <p class="mt-8 text-center">
            We are confirming your subscription. Please wait.
        </p>
    </Dialog>

    <Dialog
        bind:isOpen={openDialogs}
        id="continueUnpaidSubscription"
        title="Pending Payment for Your Plan"
        actions={[{ label: "Continue", callback: continueUnpaidSubscription }]}
    >
        <p class="mt-8">Do you want to continue and complete the payment?</p>
    </Dialog>
</DashboardLayout>

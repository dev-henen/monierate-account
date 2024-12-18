<script lang="ts">
    import "../app.css";
    import {
        clearPopup,
        toggleButtonLoad,
        toggleMessage,
        togglePopup,
    } from "$lib/functions";
    import { messageStore } from "$lib/notification";

    let message: string | null = null;
    messageStore.subscribe((value: any) => {
        message = value;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</svelte:head>

<slot />

<div
    id="popup"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden w-full overflow-y-hidden h-[calc(100%)] max-h-full hidden bg-gray-50 dark:bg-gray-300"
>
    <div class="w-full flex flex-col justify-center h-[100vh]">
        <div
            class="w-[80%] md:w-[500px] min-h-[240px] mx-auto relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
            <div class="p-6 text-center">
                <svg
                    class="mx-auto mb-6 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <h3
                    class="text-lg font-normal text-gray-500 dark:text-gray-100 mb-8"
                    id="popup-message"
                >
                    message here
                </h3>
                <button on:click={clearPopup} type="button" class="button">
                    Okay
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Notification Container -->
{#if $messageStore}
    <div
        class="
    fixed bottom-20 md:bottom-10 left-1/2 transform -translate-x-1/2 z-50
    w-[90%] md:w-[400px] p-4
    bg-black/85 text-white rounded-lg shadow-lg text-center text-[0.9em]
    fade-notification show
    "
    >
        <p>{$messageStore}</p>
    </div>
{/if}

<style>
    .fade-notification {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    .fade-notification.show {
        opacity: 1;
    }
</style>

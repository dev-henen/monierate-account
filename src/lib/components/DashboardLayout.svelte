<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    export let title: string = "Dashboard";

    let showMenu = false;
    function toggleMenu() {
        showMenu = !showMenu;
    }

    let currentPath = "";
    onMount(() => {
        currentPath = window.location.pathname;
    });
</script>

<svelte:head>
    <title>Monierate / {title}</title>
</svelte:head>

<div class="bg-white dark:bg-gray-800">
    <!-- Header -->
    <header
        class="w-full {showMenu
            ? 'ml-[300px]'
            : ''} md:w-[calc(100%-300px)] md:ml-[300px]
        bg-white dark:bg-gray-800 fixed top-0 left-0
        z-10 flex items-center justify-between p-3 md:px-8 border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
        <div class="inline-flex items-center space-x-4">
            <ul class="flex items-center space-x-4">
                <li>
                    <a href="/">
                        <span class="md:hidden">Docs</span>
                        <span class="hidden md:inline">Documentation</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <span class="md:hidden">Status</span>
                        <span class="hidden md:inline">API Status</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:hello@tailgrids.com" target="_blank">
                        <span class="md:hidden">Help</span>
                        <span class="hidden md:inline">Help & Support</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="inline-flex items-center space-x-4">
            <div class="hidden md:flex items-center justify-center">
                <div class="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        class="bg-white dark:bg-gray-900 w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:blue-100 focus:border-transparent"
                    />
                    <span
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <div
                class="w-12 h-12 overflow-hidden rounded-full hidden md:inline-block"
            >
                <a href="/edit-account-details">
                    <img
                        src="/icons/user.png"
                        alt="Profile"
                        width="100"
                        height="100"
                        class="object-cover"
                    />
                </a>
            </div>

            <button
                aria-label="Menu"
                class="button p-2 px-3 md:hidden bg-transparent hover:bg-transparent text-gray-500 dark:text-gray-300 text-2xl"
                on:click={toggleMenu}
            >
                <i class="fa fa-bars"></i>
            </button>
        </div>
    </header>

    <!-- Sidebar -->
    <nav
        id="sidebar"
        class="bg-gray-50 dark:bg-gray-900 shadow-2xl md:shadow-none z-30 md:z-0
        md:w-[300px] {showMenu
            ? 'w-[300px] p-4'
            : 'w-0'} overflow-hidden h-full fixed top-0 left-0 bg-inherit md:p-4 transition-all duration-300"
    >
        <div class="px-2 py-2 relative">
            <a href="https://monierate.com" class="inline-block">
                <img
                    src="/monierate-logo-white.png"
                    alt="Monierate"
                    width="150"
                    class="hidden dark:inline"
                />
                <img
                    src="/monierate-logo.png"
                    alt="Monierate"
                    width="150"
                    class="dark:hidden"
                />
            </a>
            <button
                class="md:hidden absolute top-0 right-0 p-2 text-lg text-gray-300"
                on:click={toggleMenu}>&times;</button
            >
        </div>
        <div
            class="overflow-y-auto md:overflow-y-hidden md:hover:overflow-y-auto h-[90%]
            scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
        >
            <ul class="pt-10 text-[0.9em]">
                <!--Dashboard-->
                <li>
                    <a
                        href="/"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-dashboard pr-2"></i> Dashboard
                    </a>
                </li>

                <!--API Usage-->
                <li>
                    <div
                        class="text-sm text-gray-400 dark:text-gray-400 p-4 mb-0 pt-5"
                    >
                        API Usage
                    </div>
                </li>
                <li>
                    <a
                        href="https://docs.monierate.com/get-started"
                        target="_blank"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/get-started'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-rocket pr-2"></i> Getting Started
                    </a>
                </li>
                <li>
                    <a
                        href="/api-keys"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/api-keys'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-fingerprint pr-2"></i> API Keys
                    </a>
                </li>
                <li>
                    <a
                        href="/usage-statistics"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/usage-statistics'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-chart-bar pr-2"></i> Usage Statistics
                    </a>
                </li>

                <!--Account-->
                <li>
                    <div
                        class="text-sm text-gray-400 dark:text-gray-400 p-4 mb-0 pt-5"
                    >
                        Account
                    </div>
                </li>
                <li>
                    <a
                        href="/edit-account-details"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/edit-account-details'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-user-edit pr-2"></i> Edit Account Details
                    </a>
                </li>
                <li>
                    <a
                        href="/subscription"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/subscription'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-box pr-2"></i> Subscription Plan
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="/email-notifications"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath === '/email-notifications' ? 'sidebar-active-link' : ''}"
                    >
                        <i class="fas fa-bell pr-2"></i> Email Notifications
                    </a>
                </li> -->

                <!--Billing-->
                <li>
                    <div
                        class="text-sm text-gray-400 dark:text-gray-400 p-4 mb-0 pt-5"
                    >
                        Billing
                    </div>
                </li>
                <li>
                    <a
                        href="/payment-details"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/payment-details'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-credit-card pr-2"></i> Payment Details
                    </a>
                </li>
                <li>
                    <a
                        href="/billing-history"
                        class="block px-3 py-3 text-gray-600 dark:text-gray-300
                                    sidebar-hover-link rounded-md {currentPath ===
                        '/billing-history'
                            ? 'sidebar-active-link'
                            : ''}"
                    >
                        <i class="fas fa-history pr-2"></i> Billing History
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Main Content Area -->
    <div
        class="p-3 md:p-20 mt-[90px] md:mt-[50px] w-full {showMenu
            ? 'ml-[300px]'
            : ''} md:w-[calc(100%-300px)] md:ml-[300px] transition-all duration-300"
    >
        <slot />
    </div>

    <footer
        class="border-t border-gray-200 dark:border-gray-700 p-8 mt-8 text-center w-full {showMenu
            ? 'ml-[300px]'
            : ''} md:w-[calc(100%-300px)] md:ml-[300px] transition-all duration-300"
    >
        <ul class="flex items-center space-x-2 md:space-x-4 justify-center">
            <li>
                <a href="/logout">Log Out</a>
            </li>
            <li>•</li>
            <li>
                <a href="https://monierate.com/">Contact Us</a>
            </li>
            <li>•</li>
            <li>
                <a href="https://monierate.com/policy/data"
                    >Terms & Conditions</a
                >
            </li>
        </ul>

        <div class="mt-8 text-gray-500 text-sm">
            © 2022-{new Date().getFullYear()} Monierate Ltd. All rights reserved.
        </div>
    </footer>
</div>

<style>
    .sidebar-hover-link {
        @apply hover:bg-gray-200 dark:hover:bg-gray-800;
    }
    .sidebar-active-link {
        @apply bg-gray-200 dark:bg-gray-800;
    }
</style>

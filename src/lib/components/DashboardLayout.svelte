<script lang="ts">
    import { onMount } from "svelte";

    export let title: string = "Dashboard";

    let showMenu = false;
    function toggleMenu() {
        showMenu = !showMenu;
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="flex flex-col h-screen bg-white dark:bg-gray-800">
    <!-- Header -->
    <header
        class="w-full bg-white dark:bg-gray-800 fixed top-0 left-0 z-10 flex items-center justify-between p-4 md:px-8"
    >
        <div class="inline-flex items-center space-x-4">
            <div>
                <img
                    src="/monierate-logo.png"
                    alt="Monierate"
                    width="150"
                    class="dark:hidden"
                />
                <img
                    src="/monierate-logo-white.png"
                    alt="Monierate"
                    width="150"
                    class="hidden dark:block"
                />
            </div>
        </div>
        <div class="inline-flex items-center space-x-4">
            <div class="w-12 h-12 overflow-hidden rounded-full">
                <img
                    src="/icons/user.png"
                    alt="Profile"
                    width="100"
                    height="100"
                    class="object-cover"
                />
            </div>

            <button
                aria-label="Menu"
                class="button p-2 px-3 md:hidden"
                on:click={toggleMenu}
            >
                <i class="fa fa-bars"></i>
            </button>
        </div>
    </header>

    <div class="pt-16">
        <!-- Sidebar -->
        <nav
            id="sidebar"
            class="bg-white dark:bg-gray-800 shadow-2xl md:shadow-none z-30 md:z-0 w-[300px] h-full fixed top-0 left-0 bg-inherit p-4
                   {showMenu ? 'block' : 'hidden'} md:block"
        >
            <ul class="md:pt-20">
                <li>
                    <a
                        href="/"
                        class="block px-6 py-3 text-gray-700 dark:text-gray-300
                                      hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
                    >
                        <i class="fa fa-home pr-2 text-xl"></i> Home
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Main Content Area -->
        <div class="p-5 w-[100% - 300px] md:ml-[300px]">
            <slot />
        </div>
    </div>
</div>

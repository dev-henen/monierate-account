<script lang="ts">
    import DashboardLayout from "$lib/components/DashboardLayout.svelte";
    import { user } from "$lib/stores/user";
    import { copyToClipboard, formatNumber } from "$lib/functions";
    import { formatISODateTime } from "$lib/functions";

    let currentUser: any = $user;
    let choosedAppIDName: string = "";
    function setChoosedAppIDName(name: string) {
        choosedAppIDName = name;
    }

    function calculateMonthlyUsagePercentage(data: any): {
        remainingPercentage: number;
        usedPercentage: number;
        remainingRequests: number;
    } {
        const { plan, usage } = data;
        const { requests_limit_per_month } = plan;
        const { requests_made_this_month } = usage;

        const usedPercentage =
            (requests_made_this_month / requests_limit_per_month) * 100;
        const remainingPercentage = 100 - usedPercentage;
        const remainingRequests = requests_limit_per_month - usedPercentage;

        return {
            remainingPercentage: Math.max(remainingPercentage, 0),
            usedPercentage: Math.min(usedPercentage, 100),
            remainingRequests: remainingRequests,
        };
    }
    const getMonthlyUsagePercentage =
        calculateMonthlyUsagePercentage(currentUser);
</script>

<DashboardLayout title="App IDs">
    <div class="content">
        <h2 class="text-2xl font-semibold mb-4">App IDs</h2>
        <div class="mb-10">
            Here are the active App IDs for your account, which you can
            currently use to access the Open Exchange Rates API. You can add and
            remove App IDs or expire old ones.
        </div>
    </div>

    <div class="content">
        <div
            class="overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-400 dark:scrollbar-track-gray-800 mb-10"
        >
            <table
                class="w-full min-w-[800px] border-collapse border rounded-lg text-gray-800 bg-white border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-800"
            >
                <thead>
                    <tr>
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Name</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >App ID</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Created</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Last Used</th
                        >
                        <th
                            class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                            >Deactivate</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#if currentUser.plan}
                        {#if Array.isArray(currentUser.plan)}
                            {#each currentUser.plan as item}
                                {#if item.is_active === true}
                                    <tr>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                        >
                                            {item.plan.name || "App ID"}
                                            <a
                                                href="/app-ids/{item.plan
                                                    ._id}/edit"
                                                class="text-[0.8em] ml-2"
                                            >
                                                <i class="fas fa-edit"></i> Edit</a
                                            >
                                        </td>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    class="w-full bg-transparent border border-gray-500 rounded p-1 px-2 text-gray-800 dark:text-gray-300"
                                                    value={item.plan._id}
                                                    readonly
                                                />
                                                <button
                                                    class="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                                                    title="Copy App ID"
                                                    aria-label="Copy App ID"
                                                    on:click={() =>
                                                        copyToClipboard(
                                                            item.plan._id,
                                                        )}
                                                >
                                                    <i class="fas fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                            >{item.plan.created_at
                                                ? formatISODateTime(
                                                      item.plan.created_at,
                                                  )
                                                : "N/A"}</td
                                        >
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                            >{item.plan.updated_at
                                                ? formatISODateTime(
                                                      item.plan.updated_at,
                                                  )
                                                : "N/A"}</td
                                        >
                                        <td
                                            class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                                        >
                                            <a
                                                href="/app-ids/{item.plan
                                                    ._id}/deactivate"
                                                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                                                title="Deactivate App ID"
                                            >
                                                ✖
                                            </a>
                                        </td>
                                    </tr>
                                {/if}
                            {/each}
                        {:else if currentUser.plan.is_active === true}
                            <tr>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                >
                                    {currentUser.plan.name || "App ID"}
                                    <a
                                        href="/app-ids/{currentUser.plan
                                            ._id}/edit"
                                        class="text-[0.8em] ml-2"
                                    >
                                        <i class="fas fa-edit"></i> Edit</a
                                    >
                                </td>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                >
                                    <div class="flex items-center gap-2">
                                        <input
                                            type="text"
                                            class="w-full bg-transparent border border-gray-500 rounded p-1 px-2 text-gray-800 dark:text-gray-300"
                                            value={currentUser.plan._id}
                                            readonly
                                        />
                                        <button
                                            class="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                                            title="Copy App ID"
                                            aria-label="Copy App ID"
                                            on:click={() =>
                                                copyToClipboard(
                                                    currentUser.plan._id,
                                                )}
                                        >
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </td>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                    >{currentUser.plan.created_at
                                        ? formatISODateTime(
                                              currentUser.plan.created_at,
                                          )
                                        : "N/A"}</td
                                >
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                    >{currentUser.plan.updated_at
                                        ? formatISODateTime(
                                              currentUser.plan.updated_at,
                                          )
                                        : "N/A"}</td
                                >
                                <td
                                    class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                                >
                                    <a
                                        href="/app-ids/{currentUser.plan
                                            ._id}/deactivate"
                                        class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                                        title="Deactivate App ID"
                                    >
                                        ✖
                                    </a>
                                </td>
                            </tr>
                        {/if}
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="mt-6 space-y-2">
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Choose Name"
                    class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    bind:value={choosedAppIDName}
                />
                <button class="button"> Generate New App ID </button>
                <span class="text-gray-600 dark:text-gray-400"
                    >({formatNumber(
                        getMonthlyUsagePercentage.remainingRequests,
                    )} remaining)</span
                >
            </div>

            <!-- Common Names -->
            <div class="md:flex items-center gap-2">
                <p class="text-gray-600 dark:text-gray-400">
                    Or choose one of these common names:
                </p>
                <div class="flex gap-4 mt-1 text-blue-500">
                    <button
                        class="hover:underline"
                        on:click={() => setChoosedAppIDName("Development")}
                        >Development</button
                    >
                    <button
                        class="hover:underline"
                        on:click={() => setChoosedAppIDName("Testing")}
                        >Testing</button
                    >
                    <button
                        class="hover:underline"
                        on:click={() => setChoosedAppIDName("Staging")}
                        >Staging</button
                    >
                    <button
                        class="hover:underline"
                        on:click={() => setChoosedAppIDName("Production")}
                        >Production</button
                    >
                    <button
                        class="hover:underline"
                        on:click={() => setChoosedAppIDName("")}>(blank)</button
                    >
                </div>
            </div>
        </div>
    </div>

    <!--INACTIVE IDs-->
    <div class="content mt-20">
        <h2 class="text-2xl font-semibold mb-4">Inactive App IDs</h2>
        <div class="mb-10">
            The following App IDs are inactive and cannot be used to access the
            API:
        </div>

        <div
            class="overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-400 dark:scrollbar-track-gray-800 mb-10"
        >
            <table
                class="w-full min-w-[800px] border-collapse border rounded-lg text-gray-800 bg-white border-gray-200 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-800"
            >
                <thead>
                    <tr>
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Name</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >App ID</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Created</th
                        >
                        <th
                            class="p-4 text-left border-b border-gray-200 dark:border-gray-800"
                            >Removed</th
                        >
                        <th
                            class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                            >Make Active</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#if currentUser.plan}
                        {#if Array.isArray(currentUser.plan)}
                            {#each currentUser.plan as item}
                                {#if item.is_active === false}
                                    <tr>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                        >
                                            {item.plan.name || "App ID"}
                                            <a
                                                href="/app-ids/{item.plan
                                                    ._id}/edit"
                                                class="text-[0.8em] ml-2"
                                            >
                                                <i class="fas fa-edit"></i> Edit</a
                                            >
                                        </td>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    class="w-full bg-transparent border border-gray-500 rounded p-1 px-2 text-gray-800 dark:text-gray-300"
                                                    value={item.plan._id}
                                                    readonly
                                                />
                                                <button
                                                    class="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                                                    title="Copy App ID"
                                                    aria-label="Copy App ID"
                                                    on:click={() =>
                                                        copyToClipboard(
                                                            item.plan._id,
                                                        )}
                                                >
                                                    <i class="fas fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                            >{item.plan.created_at
                                                ? formatISODateTime(
                                                      item.plan.created_at,
                                                  )
                                                : "N/A"}</td
                                        >
                                        <td
                                            class="p-4 border-b border-gray-200 dark:border-gray-800"
                                            >{item.plan.updated_at
                                                ? formatISODateTime(
                                                      item.plan.updated_at,
                                                  )
                                                : "N/A"}</td
                                        >
                                        <td
                                            class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                                        >
                                            <a
                                                href="/app-ids/{item.plan
                                                    ._id}/deactivate"
                                                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 dark:bg-green-700 dark:hover:bg-green-800"
                                                title="Deactivate App ID"
                                                aria-label="Deactivate App ID"
                                            >
                                                <i class="fas fa-check"></i>
                                            </a>
                                        </td>
                                    </tr>
                                {/if}
                            {/each}
                        {:else if currentUser.plan.is_active === false}
                            <tr>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                >
                                    {currentUser.plan.name || "App ID"}
                                    <a
                                        href="/app-ids/{currentUser.plan
                                            ._id}/edit"
                                        class="text-[0.8em] ml-2"
                                    >
                                        <i class="fas fa-edit"></i> Edit</a
                                    >
                                </td>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                >
                                    <div class="flex items-center gap-2">
                                        <input
                                            type="text"
                                            class="w-full bg-transparent border border-gray-500 rounded p-1 px-2 text-gray-800 dark:text-gray-300"
                                            value={currentUser.plan._id}
                                            readonly
                                        />
                                        <button
                                            class="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                                            title="Copy App ID"
                                            aria-label="Copy App ID"
                                            on:click={() =>
                                                copyToClipboard(
                                                    currentUser.plan._id,
                                                )}
                                        >
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </td>
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                    >{currentUser.plan.created_at
                                        ? formatISODateTime(
                                              currentUser.plan.created_at,
                                          )
                                        : "N/A"}</td
                                >
                                <td
                                    class="p-4 border-b border-gray-200 dark:border-gray-800"
                                    >{currentUser.plan.updated_at
                                        ? formatISODateTime(
                                              currentUser.plan.updated_at,
                                          )
                                        : "N/A"}</td
                                >
                                <td
                                    class="p-3 text-center border-b border-gray-200 dark:border-gray-800"
                                >
                                    <a
                                        href="/app-ids/{currentUser.plan
                                            ._id}/deactivate"
                                        class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 dark:bg-green-700 dark:hover:bg-green-800"
                                        title="Deactivate App ID"
                                        aria-label="Deactivate App ID"
                                    >
                                        <i class="fas fa-check"></i>
                                    </a>
                                </td>
                            </tr>
                        {/if}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</DashboardLayout>

<script lang="ts">
    import { user } from "$lib/stores/user";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;

    if (data?.userData) {
        user.set(data.userData.data);
    }

    onMount(() => {
        if (!data.userData) {
            goto("/login");
        }
    });
</script>

<slot />

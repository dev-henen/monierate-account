<script lang="ts">
    import { user } from "$lib/stores/user";

    export let data;

    if (data?.userData) {
        user.set(data.userData.data);
    }
</script>

<slot />

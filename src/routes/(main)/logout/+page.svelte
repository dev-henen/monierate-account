<script lang="ts">
    import { user } from '$lib/stores/user';
    import { goto } from '$app/navigation';
    import { setCookie } from '$lib/functions';

    user.set(null);
    setCookie('auth_token', '', 0);
    goto('/login');
</script>

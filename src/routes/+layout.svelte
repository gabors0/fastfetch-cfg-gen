<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<style>
    @reference "/src/routes/layout.css";
    :global(body) {
        @apply bg-bg text-fg;
    }
</style>
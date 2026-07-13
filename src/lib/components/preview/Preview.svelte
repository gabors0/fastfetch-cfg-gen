<script lang="ts">
	import type { AppConfig } from '$lib/config/types';

    import PreviewLogo from '$lib/components/preview/PreviewLogo.svelte';
    import PreviewModules from '$lib/components/preview/PreviewModules.svelte';

	let { config }: { config: AppConfig } = $props();
</script>

<pre class="text-xs">
    <PreviewLogo logo={config.logo.type} />

</pre>
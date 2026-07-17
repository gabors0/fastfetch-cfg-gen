<script lang="ts">
	import type { AppConfig } from '$lib/config/types';

    import PreviewLogo from '$lib/components/preview/PreviewLogo.svelte';

	let { config }: { config: AppConfig } = $props();
</script>

<pre class="text-xs">
<PreviewLogo logo={config.logo} />
</pre>

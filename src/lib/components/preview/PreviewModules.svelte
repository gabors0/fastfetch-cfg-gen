<script lang="ts">
	import type { ModuleConfig, ModuleEntry } from '$lib/config/types';
	import { modulePreviews } from './modulePreviewData';

	let {
		modules,
		separator = ': ',
		keyType = 'string'
	}: { modules: ModuleEntry[]; separator?: string; keyType?: string } = $props();

	const ansiColors = [
		'var(--color-black)',
		'var(--color-red)',
		'var(--color-green)',
		'var(--color-yellow)',
		'var(--color-blue)',
		'var(--color-magenta)',
		'var(--color-cyan)',
		'var(--color-white)',
		'var(--color-light-black)',
		'var(--color-light-red)',
		'var(--color-light-green)',
		'var(--color-light-yellow)',
		'var(--color-light-blue)',
		'var(--color-light-magenta)',
		'var(--color-light-cyan)',
		'var(--color-light-white)'
	];

	const colorSymbols: Record<string, string> = {
		block: '███',
		background: '   ',
		circle: '●',
		diamond: '◆',
		triangle: '▲',
		square: '■',
		star: '★'
	};

	function stringOption(module: ModuleConfig, name: string, fallback = '') {
		return typeof module[name] === 'string' ? module[name] : fallback;
	}

	function numberOption(module: ModuleConfig, name: string, fallback = 0) {
		return typeof module[name] === 'number' ? module[name] : fallback;
	}

	function moduleKey(module: ModuleConfig) {
		if (keyType === 'none') return '';

		const preview = modulePreviews[module.type];
		const key = stringOption(module, 'key', preview?.key ?? module.type);
		const icon = stringOption(module, 'keyIcon');

		if (keyType === 'icon') return icon || key;
		if (keyType.startsWith('both')) return [icon, key].filter(Boolean).join(' ');

		return key;
	}

	function separatorLine(module: ModuleConfig) {
		const value = stringOption(module, 'string', '-');
		const times = numberOption(module, 'times');
		return value.repeat(times > 0 ? Math.min(times, 80) : 20);
	}

	function colorRowsFor(module: ModuleConfig) {
		const block = module.block;
		const range =
			typeof block === 'object' && block !== null && 'range' in block && Array.isArray(block.range)
				? block.range
				: [0, 15];
		const start = typeof range[0] === 'number' ? Math.max(0, range[0]) : 0;
		const end = typeof range[1] === 'number' ? Math.min(15, range[1]) : 15;

		return [
			ansiColors.slice(start, Math.min(end, 7) + 1),
			ansiColors.slice(Math.max(start, 8), end + 1)
		].filter((row) => row.length > 0);
	}

	function colorSymbol(module: ModuleConfig) {
		return colorSymbols[stringOption(module, 'symbol', 'block')] ?? colorSymbols.block;
	}
</script>

<div class="flex flex-col whitespace-pre">
	{#each modules as module (typeof module === 'string' ? module : module.type)}
		{#if typeof module === 'string' || module.type === 'break'}
			<div class="h-3" aria-hidden="true"></div>
		{:else if module.type === 'title'}
			<div>user@hostname</div>
		{:else if module.type === 'separator'}
			<div>{separatorLine(module)}</div>
		{:else if module.type === 'colors'}
			<div style:padding-left={`${numberOption(module, 'paddingLeft')}ch`}>
				{#each colorRowsFor(module) as row, rowIndex (rowIndex)}
					<div>
						{#each row as color, colorIndex (`${color}-${colorIndex}`)}
							<span
								style:color
								style:background-color={stringOption(module, 'symbol') === 'background'
									? color
									: undefined}>{colorSymbol(module)}</span
							>
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			{@const key = moduleKey(module)}
			<div>
				{#if key}<span>{key}{separator}</span>{/if}<span
					>{modulePreviews[module.type]?.value ?? 'Example value'}</span
				>
			</div>
		{/if}
	{/each}
</div>

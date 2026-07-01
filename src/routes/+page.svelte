<script lang="ts">
	import PatternHeading from '$lib/PatternHeading.svelte';

	let showExport = $state(true);
	let activeTab = $state<'modules' | 'logo' | 'appearance' | 'formatting' | 'advanced'>('modules');

	type ControlType = 'text' | 'number' | 'checkbox' | 'select';

	type Control = {
		label: string;
		path: string;
		type: ControlType;
		value?: string | number | boolean | null;
		options?: string[];
		placeholder?: string;
	};

	type Group = {
		title: string;
		controls: Control[];
	};

	type ModuleItem = {
		type: string;
		keyIcon?: string;
		key?: string;
		controls: Control[];
	};

	const tabs = [
		{ id: 'modules', label: 'Modules' },
		{ id: 'logo', label: 'Logo' },
		{ id: 'appearance', label: 'Appearance' },
		{ id: 'formatting', label: 'Formatting' },
		{ id: 'advanced', label: 'Advanced' }
	] as const;

	const logoTypeOptions = [
		'auto',
		'builtin',
		'small',
		'file',
		'file-raw',
		'data',
		'data-raw',
		'command-raw',
		'sixel',
		'kitty',
		'kitty-direct',
		'kitty-icat',
		'iterm',
		'chafa',
		'raw',
		'none'
	];
	const logoPositionOptions = ['left', 'top', 'right'];
	const sizePrefixOptions = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const binaryPrefixOptions = ['iec', 'si', 'jedec'];
	const spaceBeforeUnitOptions = ['default', 'always', 'never'];
	const temperatureUnitOptions = ['C', 'F', 'K', 'D'];
	const percentTypeOptions = ['num', 'bar', 'hide-others', 'num-color', 'bar-monochrome'];
	const keyTypeOptions = [
		'none',
		'string',
		'icon',
		'both',
		'both-0',
		'both-1',
		'both-2',
		'both-3',
		'both-4'
	];
	const trailingZeroOptions = ['default', 'always', 'never'];
	const displayCompactTypeOptions = [
		'none',
		'original',
		'scaled',
		'original-with-refresh-rate',
		'scaled-with-refresh-rate'
	];
	const displayOrderOptions = ['none', 'asc', 'desc'];
	const gpuDetectionMethodOptions = ['auto', 'pci', 'vulkan', 'opencl', 'egl-ext', 'opengl'];
	const gpuHideTypeOptions = ['none', 'integrated', 'discrete', 'unknown'];
	const colorSymbolOptions = [
		'block',
		'background',
		'circle',
		'diamond',
		'triangle',
		'square',
		'star'
	];
	const colorBrightnessOptions = ['default', 'light', 'normal'];

	const advancedGroups: Group[] = [
		{
			title: 'Runtime',
			controls: [
				{ label: 'Thread', path: 'general.thread', type: 'checkbox', value: true },
				{
					label: 'Processing timeout',
					path: 'general.processingTimeout',
					type: 'number',
					value: 5000
				},
				{ label: 'Detect version', path: 'general.detectVersion', type: 'checkbox', value: true },
				{ label: 'Player name', path: 'general.playerName', type: 'text', value: '' },
				{ label: 'Force DRM', path: 'general.dsForceDrm', type: 'checkbox', value: false }
			]
		},
		{
			title: 'Diagnostics and output',
			controls: [
				{ label: 'Stat', path: 'display.stat', type: 'checkbox', value: false },
				{ label: 'Pipe', path: 'display.pipe', type: 'checkbox', value: false },
				{ label: 'Show errors', path: 'display.showErrors', type: 'checkbox', value: false },
				{
					label: 'Disable linewrap',
					path: 'display.disableLinewrap',
					type: 'checkbox',
					value: true
				},
				{ label: 'Hide cursor', path: 'display.hideCursor', type: 'checkbox', value: false },
				{ label: 'No buffer', path: 'display.noBuffer', type: 'checkbox', value: false },
				{
					label: 'Constants',
					path: 'display.constants',
					type: 'text',
					value: '',
					placeholder: 'empty list'
				}
			]
		}
	];

	const logoGroups: Group[] = [
		{
			title: 'Source',
			controls: [
				{
					label: 'Type',
					path: 'logo.type',
					type: 'select',
					value: 'auto',
					options: logoTypeOptions
				},
				{ label: 'Source', path: 'logo.source', type: 'text', value: '' },
				{ label: 'Width', path: 'logo.width', type: 'number', value: null, placeholder: 'auto' },
				{ label: 'Height', path: 'logo.height', type: 'number', value: null, placeholder: 'auto' },
				{
					label: 'Position',
					path: 'logo.position',
					type: 'select',
					value: 'left',
					options: logoPositionOptions
				}
			]
		},
		{
			title: 'Behavior',
			controls: [
				{ label: 'Print remaining', path: 'logo.printRemaining', type: 'checkbox', value: true },
				{
					label: 'Preserve aspect ratio',
					path: 'logo.preserveAspectRatio',
					type: 'checkbox',
					value: false
				},
				{ label: 'Recache', path: 'logo.recache', type: 'checkbox', value: false }
			]
		},
		{
			title: 'Padding',
			controls: [
				{ label: 'Top', path: 'logo.padding.top', type: 'number', value: 0 },
				{ label: 'Left', path: 'logo.padding.left', type: 'number', value: 0 },
				{ label: 'Right', path: 'logo.padding.right', type: 'number', value: 4 }
			]
		},
		{
			title: 'Palette',
			controls: Array.from({ length: 9 }, (_, index) => ({
				label: `Color ${index + 1}`,
				path: `logo.color.${index + 1}`,
				type: 'text' as const,
				value: ''
			}))
		},
		{
			title: 'Chafa',
			controls: [
				{ label: 'Foreground only', path: 'logo.chafa.fgOnly', type: 'checkbox', value: false },
				{
					label: 'Symbols',
					path: 'logo.chafa.symbols',
					type: 'text',
					value: 'block+border+space-wide-inverted'
				}
			]
		}
	];

	const appearanceGroups: Group[] = [
		{
			title: 'Basics',
			controls: [
				{ label: 'Separator', path: 'display.separator', type: 'text', value: ': ' },
				{ label: 'Bright color', path: 'display.brightColor', type: 'checkbox', value: true }
			]
		},
		{
			title: 'Color',
			controls: [
				{ label: 'Keys', path: 'display.color.keys', type: 'text', value: '' },
				{ label: 'Title', path: 'display.color.title', type: 'text', value: '' },
				{ label: 'Output', path: 'display.color.output', type: 'text', value: '' },
				{ label: 'Separator', path: 'display.color.separator', type: 'text', value: '' }
			]
		},
		{
			title: 'Percent',
			controls: [
				{
					label: 'Type 1',
					path: 'display.percent.type[0]',
					type: 'select',
					value: 'num',
					options: percentTypeOptions
				},
				{
					label: 'Type 2',
					path: 'display.percent.type[1]',
					type: 'select',
					value: 'num-color',
					options: percentTypeOptions
				},
				{ label: 'Digits', path: 'display.percent.ndigits', type: 'number', value: 0 },
				{ label: 'Green color', path: 'display.percent.color.green', type: 'text', value: '32' },
				{ label: 'Yellow color', path: 'display.percent.color.yellow', type: 'text', value: '93' },
				{ label: 'Red color', path: 'display.percent.color.red', type: 'text', value: '91' },
				{
					label: 'Space before unit',
					path: 'display.percent.spaceBeforeUnit',
					type: 'select',
					value: 'default',
					options: spaceBeforeUnitOptions
				},
				{ label: 'Width', path: 'display.percent.width', type: 'number', value: 0 }
			]
		},
		{
			title: 'Bar',
			controls: [
				{ label: 'Elapsed char', path: 'display.bar.char.elapsed', type: 'text', value: '■' },
				{ label: 'Total char', path: 'display.bar.char.total', type: 'text', value: '-' },
				{ label: 'Left border', path: 'display.bar.border.left', type: 'text', value: '[ ' },
				{ label: 'Right border', path: 'display.bar.border.right', type: 'text', value: ' ]' },
				{ label: 'Left elapsed', path: 'display.bar.border.leftElapsed', type: 'text', value: '' },
				{
					label: 'Right elapsed',
					path: 'display.bar.border.rightElapsed',
					type: 'text',
					value: ''
				},
				{ label: 'Elapsed color', path: 'display.bar.color.elapsed', type: 'text', value: 'auto' },
				{ label: 'Total color', path: 'display.bar.color.total', type: 'text', value: '97' },
				{ label: 'Border color', path: 'display.bar.color.border', type: 'text', value: '97' },
				{ label: 'Width', path: 'display.bar.width', type: 'number', value: 10 }
			]
		},
		{
			title: 'Keys',
			controls: [
				{ label: 'Key width', path: 'display.key.width', type: 'number', value: 0 },
				{
					label: 'Key type',
					path: 'display.key.type',
					type: 'select',
					value: 'string',
					options: keyTypeOptions
				},
				{ label: 'Key left padding', path: 'display.key.paddingLeft', type: 'number', value: 0 }
			]
		}
	];

	const formattingGroups: Group[] = [
		{
			title: 'Duration',
			controls: [
				{
					label: 'Abbreviation',
					path: 'display.duration.abbreviation',
					type: 'checkbox',
					value: false
				},
				{
					label: 'Space before unit',
					path: 'display.duration.spaceBeforeUnit',
					type: 'select',
					value: 'default',
					options: spaceBeforeUnitOptions
				}
			]
		},
		{
			title: 'Size',
			controls: [
				{
					label: 'Max prefix',
					path: 'display.size.maxPrefix',
					type: 'select',
					value: 'YB',
					options: sizePrefixOptions
				},
				{
					label: 'Binary prefix',
					path: 'display.size.binaryPrefix',
					type: 'select',
					value: 'iec',
					options: binaryPrefixOptions
				},
				{ label: 'Digits', path: 'display.size.ndigits', type: 'number', value: 2 },
				{
					label: 'Space before unit',
					path: 'display.size.spaceBeforeUnit',
					type: 'select',
					value: 'default',
					options: spaceBeforeUnitOptions
				}
			]
		},
		{
			title: 'Temperature',
			controls: [
				{
					label: 'Unit',
					path: 'display.temp.unit',
					type: 'select',
					value: 'D',
					options: temperatureUnitOptions
				},
				{ label: 'Digits', path: 'display.temp.ndigits', type: 'number', value: 1 },
				{ label: 'Green color', path: 'display.temp.color.green', type: 'text', value: '32' },
				{ label: 'Yellow color', path: 'display.temp.color.yellow', type: 'text', value: '93' },
				{ label: 'Red color', path: 'display.temp.color.red', type: 'text', value: '91' },
				{
					label: 'Space before unit',
					path: 'display.temp.spaceBeforeUnit',
					type: 'select',
					value: 'default',
					options: spaceBeforeUnitOptions
				}
			]
		},
		{
			title: 'Frequency and fraction',
			controls: [
				{ label: 'Frequency digits', path: 'display.freq.ndigits', type: 'number', value: 2 },
				{
					label: 'Frequency spacing',
					path: 'display.freq.spaceBeforeUnit',
					type: 'select',
					value: 'default',
					options: spaceBeforeUnitOptions
				},
				{ label: 'Fraction digits', path: 'display.fraction.ndigits', type: 'number', value: 2 },
				{
					label: 'Trailing zeros',
					path: 'display.fraction.trailingZeros',
					type: 'select',
					value: 'default',
					options: trailingZeroOptions
				}
			]
		}
	];

	const modules: ModuleItem[] = [
		{
			type: 'title',
			keyIcon: '',
			key: ' ',
			controls: [
				{ label: 'FQDN', path: 'modules.title.fqdn', type: 'checkbox', value: false },
				{ label: 'User color', path: 'modules.title.color.user', type: 'text', value: '' },
				{ label: 'At color', path: 'modules.title.color.at', type: 'text', value: '' },
				{ label: 'Host color', path: 'modules.title.color.host', type: 'text', value: '' }
			]
		},
		{
			type: 'separator',
			controls: [
				{ label: 'String', path: 'modules.separator.string', type: 'text', value: '-' },
				{ label: 'Output color', path: 'modules.separator.outputColor', type: 'text', value: '' },
				{ label: 'Times', path: 'modules.separator.times', type: 'number', value: 0 }
			]
		},
		{ type: 'os', keyIcon: '', controls: [] },
		{ type: 'host', keyIcon: '󰌢', controls: [] },
		{ type: 'kernel', keyIcon: '', controls: [] },
		{ type: 'uptime', keyIcon: '', controls: [] },
		{
			type: 'packages',
			keyIcon: '󰏖',
			controls: [
				{ label: 'Disabled', path: 'modules.packages.disabled', type: 'text', value: 'winget' },
				{ label: 'Combined', path: 'modules.packages.combined', type: 'checkbox', value: false }
			]
		},
		{ type: 'shell', keyIcon: '', controls: [] },
		{
			type: 'display',
			keyIcon: '󰍹',
			controls: [
				{
					label: 'Compact type',
					path: 'modules.display.compactType',
					type: 'select',
					value: 'none',
					options: displayCompactTypeOptions
				},
				{
					label: 'Precise refresh rate',
					path: 'modules.display.preciseRefreshRate',
					type: 'checkbox',
					value: false
				},
				{
					label: 'Order',
					path: 'modules.display.order',
					type: 'select',
					value: 'none',
					options: displayOrderOptions
				}
			]
		},
		{ type: 'de', keyIcon: '', controls: [] },
		{
			type: 'wm',
			keyIcon: '',
			controls: [
				{ label: 'Detect plugin', path: 'modules.wm.detectPlugin', type: 'checkbox', value: true }
			]
		},
		{ type: 'wmtheme', keyIcon: '󰓸', controls: [] },
		{ type: 'theme', keyIcon: '󰉼', controls: [] },
		{ type: 'icons', keyIcon: '', controls: [] },
		{ type: 'font', keyIcon: '', controls: [] },
		{ type: 'cursor', keyIcon: '󰆿', controls: [] },
		{ type: 'terminal', keyIcon: '', controls: [] },
		{ type: 'terminalfont', keyIcon: '', controls: [] },
		{
			type: 'cpu',
			keyIcon: '',
			controls: [
				{ label: 'Temperature', path: 'modules.cpu.temp', type: 'checkbox', value: false },
				{
					label: 'PE core count',
					path: 'modules.cpu.showPeCoreCount',
					type: 'checkbox',
					value: false
				},
				{ label: 'Temp sensor', path: 'modules.cpu.tempSensor', type: 'text', value: '' }
			]
		},
		{
			type: 'gpu',
			keyIcon: '󰾲',
			controls: [
				{
					label: 'Driver specific',
					path: 'modules.gpu.driverSpecific',
					type: 'checkbox',
					value: false
				},
				{
					label: 'Detection method',
					path: 'modules.gpu.detectionMethod',
					type: 'select',
					value: 'pci',
					options: gpuDetectionMethodOptions
				},
				{ label: 'Temperature', path: 'modules.gpu.temp', type: 'checkbox', value: false },
				{
					label: 'Hide type',
					path: 'modules.gpu.hideType',
					type: 'select',
					value: 'none',
					options: gpuHideTypeOptions
				},
				{ label: 'Percent green', path: 'modules.gpu.percent.green', type: 'number', value: 50 },
				{ label: 'Percent yellow', path: 'modules.gpu.percent.yellow', type: 'number', value: 80 },
				{ label: 'Percent type', path: 'modules.gpu.percent.type', type: 'number', value: 0 }
			]
		},
		{
			type: 'memory',
			keyIcon: '',
			controls: [
				{ label: 'Percent green', path: 'modules.memory.percent.green', type: 'number', value: 50 },
				{
					label: 'Percent yellow',
					path: 'modules.memory.percent.yellow',
					type: 'number',
					value: 80
				},
				{ label: 'Percent type', path: 'modules.memory.percent.type', type: 'number', value: 0 }
			]
		},
		{
			type: 'swap',
			keyIcon: '󰓡',
			controls: [
				{ label: 'Separate', path: 'modules.swap.separate', type: 'checkbox', value: false },
				{ label: 'Percent green', path: 'modules.swap.percent.green', type: 'number', value: 50 },
				{ label: 'Percent yellow', path: 'modules.swap.percent.yellow', type: 'number', value: 80 },
				{ label: 'Percent type', path: 'modules.swap.percent.type', type: 'number', value: 0 }
			]
		},
		{
			type: 'disk',
			keyIcon: '',
			controls: [
				{ label: 'Show regular', path: 'modules.disk.showRegular', type: 'checkbox', value: true },
				{
					label: 'Show external',
					path: 'modules.disk.showExternal',
					type: 'checkbox',
					value: true
				},
				{ label: 'Show hidden', path: 'modules.disk.showHidden', type: 'checkbox', value: false },
				{
					label: 'Show subvolumes',
					path: 'modules.disk.showSubvolumes',
					type: 'checkbox',
					value: false
				},
				{
					label: 'Show read only',
					path: 'modules.disk.showReadOnly',
					type: 'checkbox',
					value: true
				},
				{ label: 'Show unknown', path: 'modules.disk.showUnknown', type: 'checkbox', value: false },
				{ label: 'Folders', path: 'modules.disk.folders', type: 'text', value: '' },
				{
					label: 'Hide folders',
					path: 'modules.disk.hideFolders',
					type: 'text',
					value: '/efi:/boot:/boot/*'
				},
				{ label: 'Hide FS', path: 'modules.disk.hideFS', type: 'text', value: '' },
				{
					label: 'Use available',
					path: 'modules.disk.useAvailable',
					type: 'checkbox',
					value: false
				},
				{ label: 'Percent green', path: 'modules.disk.percent.green', type: 'number', value: 50 },
				{ label: 'Percent yellow', path: 'modules.disk.percent.yellow', type: 'number', value: 80 },
				{ label: 'Percent type', path: 'modules.disk.percent.type', type: 'number', value: 0 }
			]
		},
		{
			type: 'localip',
			keyIcon: '󰩟',
			controls: [
				{ label: 'Show IPv4', path: 'modules.localip.showIpv4', type: 'checkbox', value: true },
				{ label: 'Show IPv6', path: 'modules.localip.showIpv6', type: 'checkbox', value: false },
				{ label: 'Show MAC', path: 'modules.localip.showMac', type: 'checkbox', value: false },
				{
					label: 'Show loopback',
					path: 'modules.localip.showLoop',
					type: 'checkbox',
					value: false
				},
				{
					label: 'Show prefix length',
					path: 'modules.localip.showPrefixLen',
					type: 'checkbox',
					value: true
				},
				{ label: 'Show MTU', path: 'modules.localip.showMtu', type: 'checkbox', value: false },
				{ label: 'Show speed', path: 'modules.localip.showSpeed', type: 'checkbox', value: false },
				{ label: 'Show flags', path: 'modules.localip.showFlags', type: 'checkbox', value: false },
				{ label: 'Compact', path: 'modules.localip.compact', type: 'checkbox', value: false },
				{
					label: 'Default route only',
					path: 'modules.localip.defaultRouteOnly',
					type: 'checkbox',
					value: true
				},
				{
					label: 'Show all IPs',
					path: 'modules.localip.showAllIps',
					type: 'checkbox',
					value: false
				},
				{ label: 'Name prefix', path: 'modules.localip.namePrefix', type: 'text', value: '' }
			]
		},
		{
			type: 'battery',
			keyIcon: '',
			controls: [
				{ label: 'Temperature', path: 'modules.battery.temp', type: 'checkbox', value: false },
				{
					label: 'Percent green',
					path: 'modules.battery.percent.green',
					type: 'number',
					value: 50
				},
				{
					label: 'Percent yellow',
					path: 'modules.battery.percent.yellow',
					type: 'number',
					value: 20
				},
				{ label: 'Percent type', path: 'modules.battery.percent.type', type: 'number', value: 0 }
			]
		},
		{ type: 'poweradapter', keyIcon: '󰚥', controls: [] },
		{ type: 'locale', keyIcon: '', controls: [] },
		{ type: 'break', controls: [] },
		{
			type: 'colors',
			keyIcon: '',
			key: ' ',
			controls: [
				{
					label: 'Symbol',
					path: 'modules.colors.symbol',
					type: 'select',
					value: 'block',
					options: colorSymbolOptions
				},
				{ label: 'Left padding', path: 'modules.colors.paddingLeft', type: 'number', value: 0 },
				{ label: 'Block width', path: 'modules.colors.block.width', type: 'number', value: 3 },
				{ label: 'Range start', path: 'modules.colors.block.range[0]', type: 'number', value: 0 },
				{ label: 'Range end', path: 'modules.colors.block.range[1]', type: 'number', value: 15 },
				{
					label: 'Brightness',
					path: 'modules.colors.brightness',
					type: 'select',
					value: 'default',
					options: colorBrightnessOptions
				}
			]
		}
	];

	function valueOf(control: Control) {
		return control.value == null ? '' : String(control.value);
	}

	function moduleSharedControls(module: ModuleItem): Control[] {
		const basePath = `modules.${module.type}`;
		const controls: Control[] = [];

		if (module.type !== 'break' && module.type !== 'separator') {
			controls.push(
				{
					label: 'Title / key',
					path: `${basePath}.key`,
					type: 'text',
					value: module.key ?? ''
				},
				{
					label: 'Key icon',
					path: `${basePath}.keyIcon`,
					type: 'text',
					value: module.keyIcon ?? ''
				},
				{
					label: 'Key color',
					path: `${basePath}.keyColor`,
					type: 'text',
					value: ''
				},
				{
					label: 'Key width',
					path: `${basePath}.keyWidth`,
					type: 'number',
					value: null,
					placeholder: 'global'
				}
			);
		}

		if (module.type !== 'break' && module.type !== 'colors') {
			controls.push({
				label: 'Output color',
				path: `${basePath}.outputColor`,
				type: 'text',
				value: ''
			});
		}

		if (module.type !== 'break' && module.type !== 'separator' && module.type !== 'colors') {
			controls.push({
				label: 'Format',
				path: `${basePath}.format`,
				type: 'text',
				value: ''
			});
		}

		controls.push({
			label: 'Condition',
			path: `${basePath}.condition`,
			type: 'text',
			value: ''
		});

		return controls.filter(
			(control) => !module.controls.some((moduleControl) => moduleControl.path === control.path)
		);
	}

	function moduleControls(module: ModuleItem) {
		return [...moduleSharedControls(module), ...module.controls];
	}

	function activeTabLabel() {
		return tabs.find((tab) => tab.id === activeTab)?.label ?? 'Config';
	}

	function activeGroups(): Group[] {
		switch (activeTab) {
			case 'logo':
				return logoGroups;
			case 'appearance':
				return appearanceGroups;
			case 'formatting':
				return formattingGroups;
			case 'advanced':
				return advancedGroups;
			default:
				return [];
		}
	}
</script>

<div
	class={[
		'm-2 grid min-h-[calc(100dvh-1rem)] grid-cols-1 gap-x-3 gap-y-1 *:p-2 md:h-[calc(100dvh-1rem)] md:grid-cols-2',
		showExport
			? 'grid-rows-[3rem_auto_auto_auto] md:grid-rows-[3rem_3fr_2fr]'
			: 'grid-rows-[3rem_auto_auto_auto] md:grid-rows-[3rem_minmax(0,1fr)_auto]'
	]}
>
	<div class="border-4 border-bg-dim text-accent md:col-span-2">fastfetch config generator</div>
	<fieldset>
		<legend>Preview</legend>
		yo
	</fieldset>
	<fieldset class="min-h-128 md:row-span-2 md:min-h-0">
		<legend>Config</legend>
		<div class="flex h-full min-h-0 flex-col gap-2">
			<nav
				class="flex max-w-full gap-1 overflow-x-auto border-b-2 border-bg-dim pb-2"
				aria-label="Config sections"
			>
				{#each tabs as tab (tab.id)}
					<button
						type="button"
						class:active-tab={activeTab === tab.id}
						class="tab-button"
						aria-pressed={activeTab === tab.id}
						onclick={() => (activeTab = tab.id)}
					>
						{activeTab === tab.id ? `[${tab.label}]` : tab.label}
					</button>
				{/each}
			</nav>

			<div class="min-h-0 flex-1 overflow-y-auto pr-1">
				{#if activeTab !== 'modules'}
					<section aria-label={`${activeTabLabel()} settings`}>
						{#each activeGroups() as group (group.title)}
							<div class="setting-group">
								<PatternHeading title={group.title} />
								<div class="control-grid">
									{#each group.controls as control (control.path)}
										<label class:checkbox-row={control.type === 'checkbox'}>
											<span>{control.label}</span>
											{#if control.type === 'checkbox'}
												<input type="checkbox" checked={control.value === true} />
											{:else if control.type === 'select'}
												<select value={valueOf(control)}>
													{#each control.options ?? [] as option (option)}
														<option value={option}>{option}</option>
													{/each}
												</select>
											{:else}
												<input
													type={control.type}
													value={valueOf(control)}
													placeholder={control.placeholder ?? ''}
												/>
											{/if}
											<small>{control.path}</small>
										</label>
									{/each}
								</div>
							</div>
						{/each}
					</section>
				{:else}
					<section class="module-list" aria-label="Configured modules">
						{#each modules as module (module.type)}
							{@const controls = moduleControls(module)}
							<details class="module-row" open={controls.length > 0 && controls.length < 6}>
								<summary>
									<span class="module-type">{module.type}</span>
									{#if module.keyIcon}
										<span class="module-chip">{module.keyIcon}</span>
									{/if}
									{#if module.key}
										<span class="module-chip">key "{module.key}"</span>
									{/if}
									<span class="module-count">
										{controls.length ? `${controls.length} settings` : 'default'}
									</span>
								</summary>
								{#if controls.length}
									<div class="control-grid module-controls">
										{#each controls as control (control.path)}
											<label class:checkbox-row={control.type === 'checkbox'}>
												<span>{control.label}</span>
												{#if control.type === 'checkbox'}
													<input type="checkbox" checked={control.value === true} />
												{:else if control.type === 'select'}
													<select value={valueOf(control)}>
														{#each control.options ?? [] as option (option)}
															<option value={option}>{option}</option>
														{/each}
													</select>
												{:else}
													<input
														type={control.type}
														value={valueOf(control)}
														placeholder={control.placeholder ?? ''}
													/>
												{/if}
												<small>{control.path}</small>
											</label>
										{/each}
									</div>
								{/if}
							</details>
						{/each}
					</section>
				{/if}
			</div>
		</div>
	</fieldset>
	<fieldset class="overflow-hidden">
		<legend>
			<button
				type="button"
				class="hidden cursor-pointer text-accent-muted hover:underline md:block"
				aria-expanded={showExport}
				onclick={() => (showExport = !showExport)}
			>
				Export [{showExport ? 'hide' : 'show'}]
			</button>
			<span class="block md:hidden">Export</span>
		</legend>
		{#if showExport}
			yo
		{/if}
	</fieldset>
</div>

<style>
	@reference "/src/routes/layout.css";
	fieldset {
		@apply m-0 min-w-0 border-4 border-bg-dim px-2;
	}
	legend {
		@apply text-accent-muted;
	}
	input,
	select {
		@apply min-h-7 w-full min-w-0 border-2 border-bg-muted bg-bg-soft px-1.5 text-fg outline-none;
	}
	input:focus,
	select:focus {
		@apply border-accent;
	}
	input[type='checkbox'] {
		@apply my-1 h-5 min-h-5 w-[3ch] cursor-pointer appearance-none border-0 bg-transparent p-0 text-fg;
	}
	input[type='checkbox']::before {
		content: '[ ]';
	}
	input[type='checkbox']:checked {
		@apply text-accent;
	}
	input[type='checkbox']:checked::before {
		content: '[*]';
	}
	small {
		@apply block overflow-hidden text-xs text-ellipsis whitespace-nowrap text-fg-dim;
	}
	.tab-button {
		@apply shrink-0 cursor-pointer px-2 pb-0.5 text-sm text-fg-muted;
	}
	.tab-button:hover,
	.active-tab {
		@apply text-accent;
	}
	.setting-group {
		@apply py-1 first:pt-0;
	}
	.control-grid {
		@apply grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3;
	}
	.control-grid label {
		@apply grid min-w-0 gap-0.5 text-sm text-fg-muted;
	}
	.control-grid label > span {
		@apply overflow-hidden text-ellipsis whitespace-nowrap;
	}
	.checkbox-row {
		@apply items-start;
	}
	.checkbox-row small {
		@apply col-auto;
	}
	.module-list {
		@apply grid gap-2 py-2 first:py-0;
	}
	.module-row {
		@apply border-2 border-bg-dim bg-bg-soft;
	}
	.module-row summary {
		@apply grid cursor-pointer grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-2 py-2 text-sm text-fg-muted;
	}
	.module-type {
		@apply overflow-hidden font-bold text-ellipsis whitespace-nowrap text-accent;
	}
	.module-chip,
	.module-count {
		@apply text-xs whitespace-nowrap text-fg-dim;
	}
	.module-controls {
		@apply border-t-2 border-bg-dim p-1.5;
	}
</style>

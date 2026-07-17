export type ModulePreview = {
	key: string;
	value: string;
};

export const modulePreviews: Record<string, ModulePreview> = {
	os: { key: 'OS', value: 'Debian GNU/Linux 13 (trixie) x86_64' },
	host: { key: 'Host', value: 'Thinkpad T14 Gen 4' },
	kernel: { key: 'Kernel', value: 'Linux 6.18.0' },
	uptime: { key: 'Uptime', value: '3 hours, 24 mins' },
	packages: { key: 'Packages', value: '1842 (dpkg), 12 (flatpak)' },
	shell: { key: 'Shell', value: 'zsh 5.9' },
	display: { key: 'Display (DP-1)', value: '1920x1200 @ 1.25x in 13", 60 Hz [Built-in]' },
	de: { key: 'DE', value: 'KDE Plasma 6.4' },
	wm: { key: 'WM', value: 'KWin (Wayland)' },
	wmtheme: { key: 'WM Theme', value: 'Breeze' },
	theme: { key: 'Theme', value: 'Breeze Dark [Qt]' },
	icons: { key: 'Icons', value: 'Papirus-Dark' },
	font: { key: 'Font', value: 'Inter (10pt)' },
	cursor: { key: 'Cursor', value: 'Breeze_Light (24px)' },
	terminal: { key: 'Terminal', value: 'Konsole 25.04.3' },
	terminalfont: { key: 'Terminal Font', value: 'Monaspace Argon (11pt)' },
	cpu: { key: 'CPU', value: '12th Gen Intel(R) Core(TM) i7-1265U (12) @ 4.80 GHz' },
	gpu: { key: 'GPU', value: 'Intel Iris Xe Graphics @ 1.25 GHz [Integrated]' },
	memory: { key: 'Memory', value: '7.47 GiB / 15.33 GiB (49%)' },
	swap: { key: 'Swap', value: '1.06 MiB / 16.87 GiB (0%)' },
	disk: { key: 'Disk (/)', value: '48.64 GiB / 459.07 GiB (11%) - btrfs' },
	localip: { key: 'Local IP (enp5s0)', value: '192.168.0.46/24' },
	battery: { key: 'Battery', value: '82% [Discharging]' },
	poweradapter: { key: 'Power Adapter', value: '65W' },
	locale: { key: 'Locale', value: 'en_US.UTF-8' }
};

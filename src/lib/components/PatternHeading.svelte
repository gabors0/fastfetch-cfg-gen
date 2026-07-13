<script lang="ts">
	let { title, pattern = '=' } = $props<{
		title: string;
		pattern?: string;
	}>();

	let heading: HTMLHeadingElement;
	let titleElement: HTMLSpanElement;
	let side: HTMLSpanElement;
	let probe: HTMLSpanElement;
	let sidePattern = $state('');
	let frame = 0;

	function updatePattern() {
		if (!side || !probe || !pattern) {
			sidePattern = '';
			return;
		}

		const sideWidth = side.getBoundingClientRect().width;
		const patternWidth = probe.getBoundingClientRect().width;
		const count = patternWidth > 0 ? Math.floor(sideWidth / patternWidth) : 0;

		sidePattern = pattern.repeat(Math.max(0, count));
	}

	function queueUpdate() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(updatePattern);
	}

	$effect(() => {
		if (pattern && heading) {
			queueUpdate();
		}
	});

	$effect(() => {
		if (!heading || !titleElement || !probe) {
			return;
		}

		const observer = new ResizeObserver(queueUpdate);
		observer.observe(heading);
		observer.observe(titleElement);
		observer.observe(probe);

		document.fonts.ready.then(queueUpdate);
		queueUpdate();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});
</script>

<h2 bind:this={heading}>
	<span bind:this={side} class="pattern left" aria-hidden="true">{sidePattern}</span>
	<span bind:this={titleElement} class="title">{title}</span>
	<span class="pattern" aria-hidden="true">{sidePattern}</span>
	<span bind:this={probe} class="probe" aria-hidden="true">{pattern}</span>
</h2>

<style>
	h2 {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0.5rem;
		color: var(--color-accent);
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.25rem;
		text-align: center;
	}

	.pattern {
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
	}

	.left {
		text-align: right;
	}

	.probe {
		position: absolute;
		visibility: hidden;
		white-space: nowrap;
		pointer-events: none;
	}
</style>

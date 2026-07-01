<script lang="ts">
    let showExport = $state(true);
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
    <fieldset class="md:row-span-2">
        <legend>Config</legend>
    </fieldset>
    <fieldset class="overflow-hidden">
        <legend>
            <button
                type="button"
                class="cursor-pointer text-accent-muted hover:underline hidden md:block"
                aria-expanded={showExport}
                onclick={() => (showExport = !showExport)}
            >
                Export [{showExport ? "hide" : "show"}]
            </button>
            <span class="md:hidden block">Export</span>
        </legend>
        {#if showExport}
            yo
        {/if}
    </fieldset>
</div>

<style>
    @reference "/src/routes/layout.css";
    fieldset {
        @apply min-w-0 m-0 border-4 border-bg-dim px-2;
    }
    legend {
        @apply text-accent-muted;
    }
</style>

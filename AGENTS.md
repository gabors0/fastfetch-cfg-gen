# Repository Guide

## Commands

- Use Bun; `bun.lock` is the only lockfile. Install with `bun install --frozen-lockfile`.
- Run the app with `bun run dev`; use `bun run dev -- --open` to open it in a browser.
- Before finishing, run `bun run lint`, `bun run check`, and `bun run build`. There is no automated test suite.
- `bun run lint` stops after Prettier failures and will not reach ESLint. For focused checks, run `bunx prettier --check <path>` and `bunx eslint <path>` separately.

## Config Flow

- `src/routes/+page.svelte` owns the editor state and JSON export. It initializes state by cloning `src/lib/config/defaultConfig.ts`.
- `src/lib/config/formSchema.ts` defines the visible controls and module catalog; adding a supported Fastfetch option usually requires updating both it and `defaultConfig.ts`.
- Keep the baseline object in `defaultConfig.ts` synchronized with the root reference file `ff_config_full.jsonc`; there is no codegen step connecting them.
- Control paths are interpreted by `src/lib/config/helpers.ts`. Bracket syntax addresses array positions, while `modules.<type>.*` finds a module by its `type`, not by array index. Preserve that convention in new schema controls.
- Preview rendering is separate from export behavior under `src/lib/components/preview/`; config support does not automatically add preview support.

## Framework Wiring

- Vite forces Svelte 5 runes mode for all project source in `vite.config.ts`; use runes APIs rather than legacy component reactivity.
- Tailwind CSS 4 is loaded through the Vite plugin and `src/routes/layout.css`; there is no Tailwind config file. Component styles that use `@apply` reference that stylesheet with `@reference "/src/routes/layout.css"`.
- Theme names are duplicated in `src/app.html` for pre-render application and `src/routes/+layout.svelte` for the picker; a theme also needs matching variables in `src/routes/layout.css`.
- Production builds use `@sveltejs/adapter-vercel`, configured inside the SvelteKit Vite plugin rather than a separate `svelte.config.js`.

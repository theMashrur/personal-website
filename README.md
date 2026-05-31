# Mashrur Personal Website

Single-page React + Vite personal website for Mashrur, designed as a cyberpunk game-menu interface for quantitative development, research, and project work.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Dependency posture

The project uses the default Vite React stack only:

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`
- `eslint` and the default scaffolded lint plugins

During scaffolding, `npm audit` completed with `found 0 vulnerabilities`.

## Deployment

### Vercel

1. Push this repository to GitHub.
2. In Vercel, choose `Add New Project` and import the GitHub repo.
3. Keep the default Vite settings:
	- Build command: `npm run build`
	- Output directory: `dist`
4. Deploy.

Vercel's hobby tier is free and is the easiest low-maintenance option for this site.

### GitHub Pages fallback

This app is configured with a relative asset base in `vite.config.js`, which makes static hosting easier when serving from a repository path.

1. Run `npm run build`.
2. Upload the contents of `dist` to a Pages branch or configure a Pages workflow to publish `dist`.
3. Add a `.nojekyll` file to the deployed output if Pages is serving it directly.

## Content notes

- Contact links are wired to the provided GitHub, LinkedIn, and email values.
- Project links are marked as pending where no URL was supplied yet.

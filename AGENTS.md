# Repository Guidelines

> Whatever action you can do yourself, please do yourself. This includes starting apps and performing verification.

## Project Structure & Module Organization

This repository is intended for the Jubala.ai Next.js landing page. Keep application code in `src/` using the App Router:

- `src/app/` - routes, layouts, metadata, and page-level composition.
- `src/components/` - reusable UI; place landing-page sections in `src/components/sections/`.
- `src/lib/` - shared utilities, constants, and analytics helpers.
- [`assets/`](assets/) - source-of-truth for generated imagery, content inventories, and image-generation prompt records. Keep production-ready images in `assets/images/` and reference them through static imports.
- `public/` - static images, fonts, icons, and social previews.
- `tests/` - integration or end-to-end tests; colocate small unit tests beside their modules.

Keep page files focused on composition. Extract repeated UI and complex behavior into components or hooks.

## Build, Test, and Development Commands

Use the standard npm scripts exposed in `package.json`:

- `npm install` - install locked dependencies.
- `npm run dev` - start the local development server.
- `npm run build` - create a production build and catch route/type errors.
- `npm run start` - serve the production build locally.
- `npm run lint` - run ESLint across the codebase.
- `npm test` - run the automated test suite.

Use the committed lockfile; do not mix npm, pnpm, and Yarn.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and two-space indentation. Prefer named exports for reusable modules. Name components in PascalCase (`PricingCard.tsx`), hooks with a `use` prefix (`useCallDemo.ts`), and utilities in camelCase. Route folders and static asset names should use kebab-case.

Run the configured formatter and `npm run lint` before committing. Avoid inline styles when a shared class or design token is appropriate. Keep marketing copy centralized when reused.

## Testing Guidelines

Add unit/component tests as `*.test.ts` or `*.test.tsx`. Name end-to-end tests `tests/e2e/*.spec.ts`. Prioritize CTA links, navigation, pricing display, responsive layouts, and accessible keyboard behavior. Every bug fix should include a regression test when practical. Run tests and a production build before opening a pull request.

## Commit & Pull Request Guidelines

There is no existing commit convention, so use concise Conventional Commits such as `feat: add pricing section` or `fix: improve mobile navigation`. Keep commits focused.

Pull requests should explain the user-facing change, list verification performed, and link relevant issues. Include desktop and mobile screenshots for visual changes. Call out new environment variables or dependencies, and never commit secrets or local `.env*` files.

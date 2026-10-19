# Jubala Asset Library

This directory is the source of truth for landing-page content and generated visual assets.

- [`content/extracted-site-copy.md`](content/extracted-site-copy.md) is the canonical, complete transcription of all visible text in the six legacy screenshots.
- `images/` contains final production imagery used by the Next.js application.
- [`prompts/premium-landing-page-design-prompt.md`](prompts/premium-landing-page-design-prompt.md) contains the reusable, product-agnostic design and implementation brief.
- `prompts/` also records the final image-generation prompts and reference roles.

Use descriptive kebab-case filenames such as `hero-ai-receptionist.png`. Do not overwrite approved images silently; create a versioned sibling when iterating. Import production images statically from React components so Next.js can optimize them.

The legacy screenshots are content references only. Do not reproduce their layout, typography, colors, image treatment, or interaction design.

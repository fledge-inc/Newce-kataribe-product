# OMOTELL prototype development process

## Purpose

This repository treats the supplied proposal, requirements, and UI montage as durable design inputs. Before changing a screen, review the corresponding image in `docs/reference/screens/`, then record any intentional deviation in this document or `docs/01-product-blueprint.md`.

## Source of truth

1. `docs/reference/screens/`: one reference image per screen.
2. `docs/reference/omotell-user-flow.png`: the original 12-screen montage.
3. `docs/reference/omotell-proposal.pdf`: the supplied service proposal.
4. `docs/reference/proposal/`: rendered proposal pages for quick visual review.
5. `docs/01-product-blueprint.md`: screen inventory, architecture, types, tokens, and delivery plan.
6. `src/data/`: product and store content. Product-specific copy must live here.
7. `messages/`: shared interface translations.

## Implementation loop

1. Open the target reference image and note its hierarchy, spacing, controls, and content density.
2. Implement the screen using shared components and design tokens.
3. Keep product-specific content in typed mock data and shared labels in `next-intl`.
4. Run type checking, linting, and the Playwright screenshot test for the page.
5. Inspect the 390x844 screenshot for overflow, clipping, tap targets, and visual drift.
6. Re-run the 360px and 430px responsive checks before considering a screen complete.

## Current delivery sequence

1. Language selection
2. Store home
3. Product list
4. Product detail
5. Features and media
6. Recipes
7. Comparison
8. Ingredients and nutrition
9. Show to staff
10. Survey
11. Share and save sheet

## Design continuity rules

- Use the 4px spacing scale and tokens in `src/app/globals.css`.
- Maintain a quiet, warm-white canvas with white surfaces and thin beige rules.
- Use gold only for emphasis and primary actions.
- Keep desktop rendering in a centered 390px mobile shell.
- Preserve at least 44px interactive targets.
- Do not reproduce the reference montage as a page background.
- Use real HTML, CSS, text, controls, and optimized image assets.


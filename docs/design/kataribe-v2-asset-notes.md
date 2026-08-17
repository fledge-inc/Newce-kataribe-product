# Kataribe rich map/story assets

All implementation-ready assets are stored under `public/images/kataribe-v2/`.

## Shared UI

The site header, `01 / 06` page counter, and six-dot position indicator must remain live shared components. They are intentionally excluded from every story image.

## Story images

All six story images are exactly 887 × 1774 px (1:2). Render them at the content viewport size below the 64 px header, using `object-fit: cover` only when the viewport remains 1:2. Use a contained/cropped responsive fallback for other aspect ratios.

Page 6 contains visual action targets. Implementation must overlay semantic buttons/links for related products, Save, Instagram, LINE, and Copy link. The raster artwork alone must not be the only interactive or accessible representation.

## Map and pins

`map/store-map-portrait.png` is the active full-screen portrait map background. The original `map/store-map.webp` is preserved as a source/reference. Product pins, labels, selection state, and navigation remain live components over the map.

The `pins/` directory contains the six image sources used by the current map data. `shiro-dashi.jpg` and `golden-dashi.jpg` preserve the current repository fallback imagery because dedicated source photography is not present yet; replace these two files if approved product photography becomes available.

## Brand mark

`brand/kataribe-logo-on-kinari.png` is a raster export for visual parity with the approved mockup. The existing text-based `SiteHeader` remains preferable for localization, crisp scaling, and accessibility.

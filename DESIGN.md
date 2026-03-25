# Design System: Remix of Login & Role Selection
**Project ID:** 3768284291864935478

## Typography

*   **Global Font:** Newsreader
*   **Headline Font:** Newsreader (also utilizes Playfair Display for "Display & Headline" components)
*   **Body Font:** Inter
*   **Label Font:** Manrope
*   **Impact Labels:** Gravitas One (used sparingly for data points/branding accents)

## Color Palette

### Primary
*   **Primary:** `#110d71`
*   **On Primary:** `#ffffff`
*   **Primary Container:** `#2a2a86`
*   **On Primary Container:** `#9597f8`

### Secondary
*   **Secondary:** `#785a00`
*   **On Secondary:** `#ffffff`
*   **Secondary Container:** `#fdc008`
*   **On Secondary Container:** `#6c5000`

### Tertiary
*   **Tertiary:** `#00290f`
*   **On Tertiary:** `#ffffff`
*   **Tertiary Container:** `#00411c`
*   **On Tertiary Container:** `#55b36e`

### Background & Surface Layers
*   **Background:** `#f8f9fa`
*   **On Background:** `#191c1d`
*   **Surface:** `#f8f9fa` (Canvas of the application)
*   **Surface Container Lowest:** `#ffffff` (Interactive Cards)
*   **Surface Container Low:** `#f3f4f5` (Sidebar containers / background regions)
*   **Surface Container High:** `#e7e8e9` (Hover/Active states)
*   **On Surface:** `#191c1d`
*   **Surface Variant:** `#e1e3e4`
*   **On Surface Variant:** `#464652`

### Functional Colors
*   **Error:** `#ba1a1a`
*   **On Error:** `#ffffff`
*   **Error Container:** `#ffdad6`
*   **On Error Container:** `#93000a`
*   **Outline:** `#777683`
*   **Outline Variant:** `#c7c5d4` (Used for "Ghost Borders" at 15% opacity)

## Design Notes

This design system is built for the **"Digital Atelier"**, aiming for a balance of academic tradition and modern engineering.
*   **The "No-Line" Rule:** Uses background color shifts (`surface-container-lowest` on `surface-container-low`) instead of 1px borders to create a high-end, seamless appearance.
*   **Elevation & Depth:** Hierarchy is achieved through **Tonal Layering** rather than traditional drop shadows. Shadows are reserved for floating elements (32px-48px blur, 4%-6% opacity using `on-surface`).
*   **The "Glass & Gradient" Rule:** Primary CTAs use a subtle linear gradient from `primary` to `primary_container` instead of flat colors. Floating elements incorporate 70% opacity with a 16px `backdrop-blur`.

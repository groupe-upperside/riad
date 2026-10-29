---
name: Riad Nashira & SPA
description: The existing riad identity and its private staff interface.
colors:
  brand-gold-400: "#C8A97E"
  brand-gold-50: "#faf8f5"
  brand-gold-200: "#e6d9c9"
  brand-gold-700: "#7c613d"
  brand-gold-800: "#5e492e"
  brand-beige-100: "#F9F5F0"
  brand-beige-200: "#f3ebe0"
  brand-beige-300: "#ede1d1"
  brand-beige-400: "#e0ccb3"
  brand-dark-300: "#b3b3b3"
  brand-dark-500: "#4d4d4d"
  brand-dark-600: "#333333"
  brand-dark-800: "#1C1C1C"
  brand-gray-100: "#f0f0f0"
  brand-gray-600: "#5e5e5e"
  white: "#fff"
  staff-error-background: "#fff3f0"
  staff-error-text: "#8b2e19"
  staff-error-border: "#e5b5a9"
typography:
  display:
    fontFamily: "Playfair Display, serif"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  staff-title:
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
  staff-control:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.5
  staff-label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  staff-caption:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.75rem"
rounded:
  staff-control: "6px"
  staff-panel: "12px"
  staff-badge: "4px"
spacing:
  staff-label-gap: "8px"
  staff-control-gap: "8px"
  staff-grid-gap: "24px"
  staff-section-gap: "32px"
  staff-panel: "24px"
  staff-panel-mobile: "18px"
components:
  staff-button:
    backgroundColor: "{colors.brand-dark-800}"
    textColor: "{colors.white}"
    typography: "{typography.staff-control}"
    rounded: "{rounded.staff-control}"
    padding: "12px 20px"
  staff-button-hover:
    backgroundColor: "{colors.brand-gold-800}"
  staff-button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-dark-800}"
    rounded: "{rounded.staff-control}"
    padding: "12px 20px"
  staff-button-secondary-hover:
    backgroundColor: "{colors.brand-beige-200}"
  staff-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-dark-800}"
    typography: "{typography.staff-control}"
    rounded: "{rounded.staff-control}"
    padding: "10px 12px"
    width: "100%"
  staff-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.staff-panel}"
    padding: "{spacing.staff-panel}"
---

# Design System: Riad Nashira & SPA

## Overview

The riad identity combines warm beige, dark text and muted gold with a serif signature and clear sans-serif reading text. The private staff extension retains this palette in a restrained working interface: white panels, visible labels and explicit actions.

This is an extraction of the existing implementation, not a new visual direction. The shared source is `styles/globals.css`; `lib/fonts.ts` loads the brand families. Staff-specific behavior is scoped by `styles/staff.css`. Public page compositions remain outside this staff extension.

**Key Characteristics:**

- Warm surfaces with dark text and restrained gold accents.
- Serif brand and headings; Poppins for staff forms and data.
- Flat bordered panels, compact data typography and generous field spacing.

## Colors

### Primary

Muted brand gold remains the identity accent. The staff interface uses the darker gold shades for focus outlines, text carets and primary-button hover; the lightest shade marks table-row hover. Gold-200 is the staff text-selection background.

### Neutral

Beige-100 is the page canvas; white is the working surface. Beige-400 separates panels and navigation, while beige-300 divides table rows. Dark-800 carries the main text and staff primary actions; dark-500 carries secondary information. Dark-300 outlines controls, dark-500 strengthens their hover border, and gray-600 supplies placeholders. Disabled inputs use gray-100.

Staff errors use the dedicated warm error background, text and border tokens above. Operational status badges add Tailwind's blue, green, red and amber scales for sending, sent, failed and uncertain states; these are semantic exceptions, not additional brand accents. Every status has a visible text label.

## Typography

**Display Font:** Playfair Display, serif fallback. **Body Font:** Poppins, sans-serif fallback. Fonts are loaded through `next/font` with swap behavior; the staff body explicitly selects the Poppins variable.

Staff page titles use the `staff-title` role, with the login title one step smaller (1.5rem). Section legends use semibold text (1.125rem); preview headings use semibold text (1.25rem). Controls and most data use `staff-control`; hints, table headings and badges use `staff-caption`. Labels remain visible above fields, with hints below. Long explanatory copy uses relaxed leading (1.625).

The public base defines responsive serif headings: h1 grows from 3rem to 3.75rem and h2 from 2.25rem to 3rem at the medium breakpoint. This is distinct from the smaller explicit staff heading sizes.

Existing mapping drift: shared CSS declares `--font-family-serif` and `--font-family-sans`, while Tailwind's font utilities use its own font tokens. Loaded Playfair is the brand family, but current `font-serif` rendering may fall back to the browser serif. Preserve this as an unresolved implementation issue; do not standardize that fallback as a new brand font.

## Layout

The shared public container is centered with a maximum width of 80rem and 1rem horizontal padding. Staff uses the same maximum width with 1.25rem side padding, increasing to 2.5rem at 768px. Staff main content has 2rem vertical padding, increasing to 3rem there. The login is constrained to 32rem; the form to 56rem.

Staff forms use one column, becoming two equal columns at 640px with a 24px gap. Fieldsets and major workflow sections are spaced by 32px. Panels have 24px padding, reduced to 18px at viewport widths of 640px or less. Headers and action rows wrap. The history switches from mobile record cards to a horizontally scrollable table at 768px. Long names, references and email addresses must remain contained; staff applies `overflow-wrap: anywhere` and zero minimum widths to its main structural containers.

## Elevation & Depth

The staff extension is flat: white surfaces, warm borders and background shifts establish hierarchy without panel shadows. Existing public cards and menus also use shadows; that is a separate established treatment and should not be copied into staff forms by default. Staff interaction motion is a 150ms background-color transition on buttons.

## Shapes

Staff controls have gently rounded corners; panels are more softly rounded. Both use the frontmatter values. Borders are thin (1px), with no ornamental frame. Status badges are compact rectangles with small rounded corners, 10px horizontal and 4px vertical padding. Native select and date controls retain their familiar browser affordances.

## Components

- **Staff buttons:** dark primary action and white bordered secondary action. Both have semibold text, an 8px internal gap and a minimum height of 44px. Primary hover is dark gold; secondary hover is warm beige. Disabled buttons have 0.55 opacity and a wait cursor.
- **Fields:** white fill, dark text and gray border; minimum height 46px. Focus uses a 2px dark-gold outline with 1px offset. Disabled fields use a gray fill and not-allowed cursor. Labels sit 8px above controls; hints sit 8px below.
- **Panels:** white fill, beige border and the documented panel radius/padding. Fieldset legends use the page background behind their interruption of the top border.
- **Navigation:** a white header with a beige bottom rule, serif riad wordmark, staff identity and secondary logout control. Links inside the workflow use underlines or underline-on-hover; controls wrap on narrow screens.
- **History:** left-aligned table headings on beige, fine row dividers and a very pale gold hover. Mobile cards retain the same information and provide a full-width secondary action. Numeric timestamps use tabular figures.
- **Status:** draft is warm neutral, sending blue, sent green, refused red, uncertain amber and expired gray. Color accompanies the written label. No label disappears at narrow widths.
- **Focus:** all staff keyboard targets receive a 2px dark-gold outline with 3px offset; inputs use the tighter offset above.
- **Email preview:** a full-width, isolated iframe with a 760px height, white background, fine beige border and 8px corners. The supplied French/English HTML defines the email's separate design. Its six unchanged source rasters and their provenance are documented in `docs/staff-confirmations.md` and `email-templates/assets.json`; they do not introduce staff tokens.

## Do's and Don'ts

- Do extend the existing beige, dark and gold palette using the source tokens.
- Do keep staff labels visible, semantic states explicit and keyboard focus conspicuous.
- Do preserve responsive wrapping and the mobile history representation when extending staff screens.
- Do keep email styling and source imagery governed by the supplied confirmation templates.
- Don't promote legacy public-theme defects into new staff defaults; global scrollbar hiding and unresolved font-utility mapping remain outside this extension.
- Don't add decorative shadows or public marketing-card motion to the flat staff panels.

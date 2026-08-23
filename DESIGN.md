---
name: Guestbook Visitor Register
description: A warm local visitor register for notes, hellos, and passing thoughts.
colors:
  paper: "#f3eee4"
  ink: "#24221f"
  muted: "#756e64"
  seal-red: "#b84c3d"
  rule: "rgba(58,50,42,.24)"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 7vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.065em"
  body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "15px"
    lineHeight: 1.5
  label:
    fontFamily: "Avenir Next, Trebuchet MS, sans-serif"
    fontSize: "10px"
    letterSpacing: "0.16em"
rounded:
  none: "0"
  pill: "999px"
spacing:
  page: "42px clamp(22px, 5vw, 76px)"
  row: "19px 0 21px"
components:
  seal-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 17px 12px 20px"
---

# Design System: Guestbook Visitor Register

## Overview

**Creative North Star: "The hotel register at the end of a long hallway."**

The guestbook is a single paper spread: one page to sign, one page to read. Warm stock, ruled folios, a red seal, and numbered entries make the local-only constraint feel intentional and private.

## Colors

Paper does the talking; ink makes the register legible; seal red appears sparingly on actions, numbering, and the visitor mark.

### Primary
- **Seal red** (#b84c3d): submit action, folio numbers, and status.

### Neutral
- **Warm paper** (#f3eee4): page ground.
- **Register ink** (#24221f): headings, rules, and primary copy.
- **Muted annotation** (#756e64): metadata and helper copy.
- **Pressed rule** (rgba(58,50,42,.24)): quiet dividers.

## Typography

**Display Font:** Georgia, Times New Roman, serif
**Body Font:** Georgia, Times New Roman, serif
**Label Font:** Avenir Next, Trebuchet MS, sans-serif

**Character:** Literary serif writing with compact archival labels.

### Hierarchy
- **Display** (400, clamp 3rem–6.5rem, .88): the register thesis.
- **Headline** (400, clamp 2rem–3.8rem, .95): folio section titles.
- **Body** (400, 15–16px, 1.5): notes and helper copy.
- **Label** (400, 10–11px, uppercase, .16em): folio and date metadata.

## Layout

The first surface is a two-column spread with a generous left signing page and a larger right visitor page. The divider disappears on narrow screens and the pages stack as a single reading sequence.

## Elevation & Depth

The system is flat and paper-led. A soft page shadow separates the register from the gray desk behind it; entries use rules and whitespace instead of cards or shadows.

## Shapes

Fields are ruled lines and the note area is lined paper. The seal is circular; the submit control is the only pill. Everything else is square or unboxed.

## Components

### Buttons
- **Primary:** dark ink pill with warm paper text; seal red on hover.
- **Focus:** red two-pixel outline with a three-pixel offset.

### Inputs / Fields
- **Style:** transparent background, dark baseline, paper placeholders.
- **Focus:** red outline; the field remains a line rather than becoming a filled box.

### Signature spread
- **Style:** folio headings, numbered entries, date aligned to the right, empty state written as a waiting line.

## Do's and Don'ts

### Do:
- **Do** let the register lines and page numbers carry hierarchy.
- **Do** keep local-only honesty visible near the signing action.

### Don't:
- **Don't** turn entries into generic rounded cards.
- **Don't** introduce a second accent color or a shared-dashboard shell.

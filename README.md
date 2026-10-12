# ISOKONE — RASKAS KALUSTO. TARKKA OTE.

## Open
Extract the ZIP and open index.html in a modern browser.
Keep index.html, styles.css, script.js and assets together.
No installation, build command, account or network connection is needed for the website itself.
External maps, news links, telephone and email links use their respective services.

## The new direction
Charcoal, off-white and red-orange. Heavy condensed type, technical grid lines,
angled machinery photographs, big service headings and direct calls to action.
The original logo file and all five business photographs are preserved.
The logo is displayed in white against the dark header using CSS.
Headlines use locally bundled Barlow Condensed; body text uses Barlow.

## Scroll experience
The opening scene stays in view as the visitor scrolls through transport,
lifting and hauling. Its photographs crossfade, the image position shifts,
and the phase number, description and progress indicator change.
The numbered scene links also jump to the corresponding scroll phase.

On desktop, vertical scrolling drives the horizontal work gallery.
On smaller screens, the gallery supports native horizontal swiping.
Photographs open in an accessible dialog. Escape closes the dialog and
returns keyboard focus to the original image button.
The service strip also moves with scrolling. No scrolling is intercepted.

Operating-system reduced-motion settings are respected: pinned sequences,
parallax, crossfades and reveals become a static experience.
If animations do not appear, check your system/browser motion preferences.
With JavaScript disabled, service descriptions and direct contact links remain usable.

## Sales flow
Service buttons select the relevant service in the quote builder.
Visitors provide the machine, location and schedule, then review a prepared
email before opening their own email application.
Nothing is sent automatically. There is no backend, form submission service,
CRM integration or tracking. No quote data is stored.
Henry's telephone, email, address, business ID and invoice details are included.
A floating call button appears after the opening sequence.

## Edit and host
Text and business details: index.html
Design and responsive layouts: styles.css; readable sizing and contrast: readability.css; font system: typography.css
Scroll scenes, gallery and quote builder: script.js
Photos: assets/
Upload these files together to any static host.
This ZIP does not publish the website or replace the existing isokone.fi site.

## Content sources
https://www.isokone.fi/
https://www.isokone.fi/index.php/news/6-creating-your-site
https://www.isokone.fi/index.php/news/10-kehtokuljetus
https://www.isokone.fi/index.php/contact-us
Contact and invoice details were supplied in the conversation.
No PDF, ZIP or HTML attachments were used.
No customer testimonials, capacity numbers or performance guarantees were invented.

## Verified
Chrome at 1440x960, 768x1000, 390x844 and 360x667.
All local images load; no horizontal page overflow; section anchors resolve.
Scroll phases reach transport, lifting and hauling; the stage remains pinned;
image transforms change with scrolling; desktop gallery translates horizontally.
Mobile menu, gallery dialog, focus restoration, service selection,
quote preparation, stale-quote clearing and invoice expansion pass checks.
Reduced-motion and no-JavaScript fallbacks pass. No browser runtime exceptions.
Desktop, gallery, contact and mobile screenshots were visually reviewed.
Telephone/email applications and external destinations were not invoked.

Updated 12 October 2026.
## Readability and premium hero update
Essential labels use at least 14 px, navigation and controls 16 px,
and body copy 17 px (rem-based, enlarged by user text settings).
Line spacing, contrast, focus indicators and target spacing were improved.
Primary controls provide at least 44 px targets. Interactive target checks
also confirm the WCAG 2.2 minimum size of 24 px across the tested layouts.

Checked in Chrome at 1440, 768, 390, 360 and 320 CSS px. At 200% root-text
scaling, body text reaches 34 px and form text 32 px. No horizontal page
overflow at 1440, 390 or 320 px with enlarged text.
Short screens and enlarged text use a natural-flow scene to avoid crowding.
Normal text against solid backgrounds has a checked contrast ratio of at
least 4.94:1; large text passes 3:1. Photograph overlays were visually reviewed.
These checks address typography, contrast, reflow and key interactions;
they are not a complete independent accessibility certification.

Reference:
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

The new first hero scene uses assets/hero-premium-ai.png, an AI-generated
advertising reinterpretation of the real truck. Original job-gallery photos
are preserved. See HERO-IMAGE.md for the generation prompt and provenance.
The original Volvo photo is retained as assets/volvo.jpg.
## Refined typography
Barlow Condensed SemiBold/Bold for headlines, paired with Barlow
Regular/Medium/SemiBold for body copy, navigation, controls and labels.
The previous Impact and monospace combinations were replaced.
Tracking, leading and weight hierarchy were refined. Controls use sentence case.
The font files and their SIL Open Font Licenses are in assets/fonts/.
Fonts work offline when index.html is opened directly. No font service is required.

Verified: all five font faces load under both HTTP and file://.
The 320-1440 px layout, 200% text scaling, contrast and interaction checks pass.
Original logo, AI hero and scroll sequences are retained.
Hero refinement: front registration NMR-580, as supplied by the user. Snow-like reflections were replaced with warm dusk reflections. The authentic silver-white livery stripe and chrome were preserved.

Contact headline line spacing was increased to keep Finnish diaeresis marks clear of the question mark. The requested email-preparation note was removed from the form. Desktop and phone layouts were visually checked.

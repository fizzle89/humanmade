# Human-made — design brief (redesign, 2026-10-24)

## Audience
Freelance designers, writers, photographers and small studios delivering work to clients who
question whether it was made by a person. Buyers are the creators; verifiers are their clients.
The page must feel official enough that a client trusts the certificate, and honest enough that
it never overclaims what the certificate proves.

## Job
1. Let a creator seal a free sample certificate in under a minute, in the browser.
2. Convert creators to the $19 pack or $49/mo agency plan (Polar checkouts, unchanged).
3. Give a verifier a calm, credible re-check page.

## Identity (distinct from siblings)
"Notary ledger" — an official document, not a dashboard.
- Signal Traffic is green technical sans; Fix-It is warm artisan paper (Fraunces, olive/gold).
- Human-made is editorial formality: ivory parchment, deep ink navy, vermillion seal red.
- Typography: Playfair Display (600/700) for display and certificate titles — high-contrast
  Didone that reads as engraved print. Georgia/system serif for body. IBM Plex Mono for
  fingerprints, certificate IDs and JSON, so machine data is visually separated from prose.
- Color: bg #f5f0e6 ivory; ink #1d2438; muted #5c5a52; hairline #d8cfba; accent vermillion
  #a83a22 (seal); card #fffdf8. White on vermillion ≈ 6.6:1, ink on ivory ≈ 13:1 (AA pass).
- Signature components: double-rule engraved borders on cards (border + inner outline), a CSS
  wax-seal medallion (HM monogram) on certificates and the header, small-caps eyebrow labels,
  numbered step markers. No gradients-as-decoration, no glass, no dark mode (a certificate is a
  paper document; light only, deliberate).

## Page structure (index)
Header (wordmark + seal, nav: How it works / Try free / Verify / Pricing) → hero (eyebrow,
headline, honest subhead, dual CTA) → "What this is, plainly" honest-scope card (kept copy:
certificate = file hash + declaration + timestamp, NOT proof of authorship) → How it works
(3 steps) → free-sample form → results → pricing ($19 pack / $49/mo agency, exact Polar links)
→ verify band → footer (honest line, no Instinct branding). verify.html and the private Pro
page share the same stylesheet and furniture; the Pro URL is never linked.

## Mobile
Single column at 390px; form fields and buttons full width; pricing cards stack; seal medallion
shrinks; hash strings use overflow-wrap:anywhere inside bounded mono blocks; body scrollWidth
must equal viewport width. Tap targets ≥44px. Nav collapses to a compact wrapped row.

## Motion
Purpose only: (a) scroll-entry reveal per section (IntersectionObserver, opacity + 12px rise,
360ms ease-out, once) so the long page reads in chapters; (b) certificate "stamp" entrance on
creation (scale 1.05→1 + fade, 280ms) marking the moment a seal is pressed. prefers-reduced-motion
disables both; content is visible without JS. GSAP/Three/Remotion skipped — no choreography,
spatial model or video is earned by a form-and-certificate tool. Icons: inline SVG seal/steps,
no icon dependency. Remote scripts: none; only Google Fonts stylesheet + font files.

## Accessibility
Real labels on every field (ids unchanged for app.js), visible focus ring (2px vermillion
outline offset), aria-live on the verify result, checkbox kept as native input, color never the
only signal (verify pass/fail stated in words), keyboard operable throughout, lang attributes,
skip-to-content link.

## References (chosen / rejected)
- minimal.gallery — chosen: editorial single-column composition, generous margins, print feel.
- styles.refero.design — chosen: type-scale discipline (display 44/28, section 24, body 16).
- cta.gallery — chosen: one primary action per section; secondary as quiet outline.
- component.gallery — chosen: form field anatomy (label above, hint below, clear focus).
- navbar.gallery — chosen: minimal wordmark-left, links-right header that wraps on mobile.
- footer.design — chosen: single-line honest footer, no link farm.
- motion-primitives.com — chosen: bounded entry-reveal timing (300–400ms, once).
- 21st.dev / aceternity / magicui — rejected: React registries; page is dependency-free static.
- text-effects / animejs — rejected: decorative text animation would cheapen a legal-feeling doc.
- glass.samasante.com — rejected: glass treatment off-identity for a paper certificate.

## Visual acceptance criteria
390px and 1280px real-pixel inspection: zero page horizontal overflow; free-sample flow renders
a certificate marked FREE SAMPLE with readable hash; verify flow reports match/mismatch in
words; both Polar checkout links exact and reachable; no Instinct branding; live URL re-verified
after deploy; reduced-motion and keyboard focus pass.

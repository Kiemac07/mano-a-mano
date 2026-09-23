MANO A MANO V5 — CUSTOMISER PROTOTYPE

This version adds the fixed Mano a Mano colour list and the supplied logo rules.

COLOURS (fixed; no free hue picker)
blue, Tiffany blue, teal blue, sky blue, red, ruby red, white, silver, black, navy,
orange, purple, light purple, dark grey, light grey, deep blue, admiral blue, space blue,
blue grey, dark maroon, gold, yellow, neon yellow, clover, brown, green, lime green,
forest green, WBC green, olive green, pink, hot pink, burgundy, maroon, skin.

GLOVE TYPES
- Contest: 8oz / 10oz / 12oz.
  Contest logo is placed on the outer glove in the supplied reference position.
  Logo removal costs +£10.
  Logo colour control is intended to affect only the two grey M shapes; MANO A MANO text stays fixed.
- Training / Sparring: 14oz / 16oz.
  Training/sparring logo is placed in the supplied reference position.
  Logo removal costs +£10.
  Logo colour control affects the entire supplied logo.
- Wrist patch:
  Present on every glove by default.
  Cannot be recoloured.
  Can be removed for free.

IMPORTANT TECHNICAL NOTE
The current 3D glove is a procedural placeholder based on the supplied photos, not a manufacturing-accurate CAD model. The supplied logos are mounted as prototype decals. For the production customiser, the ideal next step is a proper GLB/GLTF model with separate meshes/materials for every colourable glove panel and separate decal textures/masks. That lets every logo and colour behave correctly from every camera angle.

The fixed palette is deliberately implemented as named buttons rather than HTML <input type=color>.

Payment/email are not connected in this static prototype. In production, use a server-side checkout/payment flow (e.g. Stripe) and a server-side email service so secret keys are never exposed in the browser.

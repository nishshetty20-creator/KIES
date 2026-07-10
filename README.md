# KIES 2026 — v2 (open canvas + live voting)

The second version of the KIES 2026 constellation site. `v1-carousel/` holds the
previous build untouched; this folder (`v2/`) is the evolved version. Both open
standalone in a browser.

```
open index.html                # macOS
# or serve for the smoothest experience:
python3 -m http.server 8000    # → http://localhost:8000
```

## Typography & colour

- **Chonburi** — the "KIES 2026" wordmark (hero + corner brand marks).
- **Domine** — all other headers and body copy.
- **Black** text throughout the light sections (headers and copy); gold is kept only
  for non-text accents (connector lines, vote badges, the active progress dot).

## What changed from v1

1. **One shared canvas, focused tour.** All ten session nodes live at distinct,
   scattered positions on one large virtual canvas. Scrolling **zooms into each
   panel and its questions**, then dollies out and flies smoothly to the next one
   (the camera scale dips between panels so it reads as travelling, not cutting).
   An **Overview** toggle (top centre) zooms all the way out so you can see every
   panel at a glance; scrolling or picking a panel returns to the focused tour.
2. **Node = session title only.** The elevated `mainQuestion` is gone. Every
   discussion question is now an equal peer represented by one orbiting card — the
   node card shows just the day/time kicker and the **session title**.
3. **Default-visible connectors.** Image→node lines are faintly drawn all the time;
   hovering/pressing a card brightens just that line and dims the rest.
4. **Corner-split branding.** "KIES" and "2026" settle into opposite corners as
   persistent, card-styled brand marks carrying the real **KIES** and **Kaizenvest**
   logos (`assets/kies-logo.svg`, `assets/kaizenvest-logo.png`).
5. **Upvoting.** Every question can be upvoted from its modal; a quiet vote count
   also shows on the card face.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Shell, styles, corner brand, modal + upvote control |
| `sessions.js` | Data model — 10 sessions, `questions[]` (no more `mainQuestion`), art pool |
| `main.js` | Open-canvas camera (pan + dolly-zoom), drift, connector highlight, modal, vote wiring |
| `votes.js` | Voting module — one `castVote(id)` surface; Supabase when configured, local fallback otherwise |
| `supabase-config.js` | **You fill this in** with your project URL + anon key |
| `supabase-setup.sql` | Run once to create the table, RLS policies, count view, and Realtime |
| `assets/` | The (unchanged) artwork set + the two logos |

## Enabling symposium-wide voting (Supabase)

Out of the box, voting runs in **local mode** — each device keeps its own tally, so the
interaction is fully demonstrable offline with no backend. To make votes shared and
live across every attendee:

1. Create a Supabase project.
2. Open the **SQL editor** and run `supabase-setup.sql` (or provision it
   conversationally via the Supabase MCP connector). It creates:
   - `question_votes (question_id, device_id, created_at)` with a **unique
     constraint on `(question_id, device_id)`** — one vote per device per question;
   - a `question_vote_counts` view for the live tally;
   - **RLS**: anon may `insert` and `select` only (no `update`/`delete`);
   - the table added to the `supabase_realtime` publication.
3. Put your **Project URL** and **anon public key** into `supabase-config.js`
   (Project Settings → API). **Never** use the `service_role` key client-side — RLS
   is what keeps a public key safe.

Once configured, `votes.js` fetches counts on load, subscribes to `INSERT`s via
**Supabase Realtime**, and questions visibly climb as the room votes. Each device
gets an anonymous `device_id` in `localStorage`; the UI fills the button instantly
and the unique constraint blocks duplicates server-side.

## Data / content note

Content is unchanged from v1 and taken verbatim (lightly tightened) from
`KIES_2026_Big_Questions_Discussion_Guide.md`, with core and contrarian questions
mixed together and no distinction between them. The source guide has **10** sessions
(the brief anticipated 11); rather than invent an eleventh, the site ships the 10
real ones. Speakers are placeholders and times are a plausible two-day schedule.

## Artwork licensing

Unchanged this round. Every image is openly-licensed traditional Filipino/Vietnamese/
Indian/Thai art (Wikimedia Commons / museum open access; Public domain / CC0 / CC BY),
downloaded and downscaled locally. Full title, artist, license and source appear in
each image's detail view. CC BY works (e.g. the Wat Phra Kaew Ramakien mural photo by
Jorge Láscar) keep visible attribution in the credit line.

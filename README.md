# Pro Path FC ⚽

A bold, animated website celebrating the greatest players in world football — from Pelé, Maradona and Cruyff to Messi, Ronaldo, Mbappé and Lamine Yamal.

## Features
- **Rotating hero spotlight** that cycles through player photos
- **Hall of Fame grid** of 20 players with 3D tilt cards and filters (Legends, Modern stars, Forwards, Midfielders, Defenders)
- **Player pop-up** with a large photo, honours, a short bio and prev/next navigation (arrow keys and Esc work too)
- **"Did you know?" pop-ups** that slide in with a player photo and fact
- Animated stat counters, a scrolling honours ticker, and scroll-reveal effects
- Fully responsive, no build step: plain HTML, CSS and JavaScript

## Player photos
Photos and bios are loaded live in the visitor's browser from Wikipedia / Wikimedia Commons (free-licensed images). If they can't load, each card shows a styled gradient with the player's initials instead.

To use your own photo for a player, put the image in an `images/` folder and add `img: "images/file.jpg"` to that player in `players.js`.

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages
In the repository on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick the branch and the `/ (root)` folder, then save. The site will appear at `https://<username>.github.io/Pro-Path-FC/`.

## Add or edit players
Everything lives in `players.js`. Each entry has a name, Wikipedia title, country, flag, position, shirt number, team colours, honours and a fun fact.

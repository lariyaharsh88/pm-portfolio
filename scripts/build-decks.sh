#!/bin/sh
# Prints each /deck/<slug> page to public/decks/<slug>.pdf. Run after `next build` (needs out/).
set -e
PORT=3317
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
(cd out && python3 -m http.server $PORT >/dev/null 2>&1) &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
for f in out/deck/*.html; do
  slug=$(basename "$f" .html)
  "$CHROME" --headless=new --no-pdf-header-footer --virtual-time-budget=4000 --window-size=1280,720 \
    --print-to-pdf="public/decks/$slug.pdf" "http://localhost:$PORT/deck/$slug.html" 2>/dev/null
  mkdir -p out/decks && cp "public/decks/$slug.pdf" out/decks/
  echo "deck $slug"
done

#!/usr/bin/env bash
# Enchart EMR — Local Development Server
# Serves the static frontend on port 8080

set -e

PORT="${1:-8080}"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Enchart EMR — Starting server..."
echo "  Directory: $DIR"
echo "  URL:       http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop."
echo ""

cd "$DIR"
python3 -m http.server "$PORT"

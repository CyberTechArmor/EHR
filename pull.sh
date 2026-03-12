#!/usr/bin/env bash
# Enchart EMR — Pull latest frontend files from repo
# Usage: ./pull.sh [branch]

set -e

REPO="https://github.com/CyberTechArmor/EHR.git"
BRANCH="${1:-claude/enchart-frontend-skeleton-6xANQ}"
DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$DIR"

echo "Enchart EMR — Pulling latest files"
echo "  Repo:   $REPO"
echo "  Branch: $BRANCH"
echo ""

# If already a git repo, just fetch and reset to latest
if [ -d ".git" ]; then
  echo "Fetching latest from origin..."
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
  echo ""
  echo "Updated to latest commit:"
  git log --oneline -1
else
  # Fresh clone
  echo "Cloning repository..."
  cd ..
  git clone --branch "$BRANCH" "$REPO" EHR
  cd EHR
  echo ""
  echo "Cloned at:"
  git log --oneline -1
fi

echo ""
echo "Done. Files are ready in: $DIR"

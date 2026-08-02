#!/usr/bin/env bash
set -e

# Fetch latest tags from remote to ensure tag sync
echo "Fetching latest tags from origin..."
git fetch --tags --quiet 2>/dev/null || true

# Format date YYMMDD (e.g. 260802 for 2026-08-02)
DATE_STR=$(date +%y%m%d)
BASE_TAG="v${DATE_STR}"

# Check if base tag exists locally or remotely
TAG_EXISTS=false
if git rev-parse "${BASE_TAG}" >/dev/null 2>&1 || git tag -l | grep -qx "${BASE_TAG}"; then
  TAG_EXISTS=true
fi

if [ "$TAG_EXISTS" = false ]; then
  NEW_TAG="${BASE_TAG}"
else
  # Find all existing tags matching vYYMMDD.N
  SUFFIXES=$(git tag -l "${BASE_TAG}.*" | sed -E "s/^${BASE_TAG}\.//" | grep -E '^[0-9]+$' | sort -n)
  
  if [ -z "$SUFFIXES" ]; then
    HIGHEST=0
  else
    HIGHEST=$(echo "$SUFFIXES" | tail -n 1)
  fi
  
  NEXT_SUFFIX=$((HIGHEST + 1))
  NEW_TAG="${BASE_TAG}.${NEXT_SUFFIX}"
fi

echo "Creating tag: ${NEW_TAG}"
git tag "${NEW_TAG}"

echo "Pushing tag ${NEW_TAG} to origin..."
git push origin "${NEW_TAG}"

echo "Done! Pushed tag ${NEW_TAG} to origin."

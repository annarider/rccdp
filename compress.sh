#!/usr/bin/env bash
# RCCDP — compress.sh
# Compresses images in assets/images/ and assets/images/wp-uploads/
# Run from the repo root: ./compress.sh
# Run after rsyncing new images from the server or adding gallery photos.
#
# Tools required (already installed via homebrew):
#   pngquant   — lossy PNG compression (huge savings, invisible quality loss)
#   mogrify    — ImageMagick in-place JPEG compression
#
# Run with --dry-run to see what would be changed without writing files.

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "⚙️  Dry run — no files will be modified."
fi

DIRS=(
  "assets/images"
  "assets/images/staff"
  "assets/images/gallery"
  "assets/images/wp-uploads"
)

PNG_QUALITY="65-85"    # pngquant: 65-85% quality range, good balance
JPG_QUALITY=82          # mogrify: 82% — sharp enough, noticeably smaller

total_saved=0

compress_png() {
  local f="$1"
  local before after saved
  before=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")

  if $DRY_RUN; then
    echo "  [dry] PNG: $f"
    return
  fi

  # pngquant writes to filename-fs8.png or filename-or8.png; we overwrite in place
  pngquant --quality="$PNG_QUALITY" --ext .png --force --skip-if-larger "$f" 2>/dev/null || true

  after=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  saved=$(( before - after ))
  if (( saved > 0 )); then
    echo "  PNG ✓  $(basename "$f")  $(( before / 1024 ))K → $(( after / 1024 ))K  (-$(( saved / 1024 ))K)"
    total_saved=$(( total_saved + saved ))
  fi
}

compress_jpg() {
  local f="$1"
  local before after saved
  before=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")

  if $DRY_RUN; then
    echo "  [dry] JPG: $f"
    return
  fi

  mogrify -quality "$JPG_QUALITY" -sampling-factor 4:2:0 -strip "$f" 2>/dev/null || true

  after=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  saved=$(( before - after ))
  if (( saved > 0 )); then
    echo "  JPG ✓  $(basename "$f")  $(( before / 1024 ))K → $(( after / 1024 ))K  (-$(( saved / 1024 ))K)"
    total_saved=$(( total_saved + saved ))
  fi
}

for dir in "${DIRS[@]}"; do
  [[ -d "$dir" ]] || continue
  echo ""
  echo "📁  $dir"

  # Process only top-level files in assets/images (not subdirs — handled separately)
  # For wp-uploads and others, recurse
  if [[ "$dir" == "assets/images" ]]; then
    find "$dir" -maxdepth 1 -type f \( -iname "*.png" \) | sort | while read -r f; do
      compress_png "$f"
    done
    find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | sort | while read -r f; do
      compress_jpg "$f"
    done
  else
    find "$dir" -type f -iname "*.png" | sort | while read -r f; do
      compress_png "$f"
    done
    find "$dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | sort | while read -r f; do
      compress_jpg "$f"
    done
  fi
done

echo ""
if $DRY_RUN; then
  echo "✅  Dry run complete. Run without --dry-run to compress."
else
  echo "✅  Done. Total saved: ~$(( total_saved / 1024 ))K ($(( total_saved / 1024 / 1024 ))MB)"
fi

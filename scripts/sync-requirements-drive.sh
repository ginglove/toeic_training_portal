#!/bin/bash
set -e

# ==============================================================================
# TOEIC PRO - Google Drive Requirement Sync Script (rclone)
# Syncs local requirements, UI/UX specs, and API docs to Google Drive
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REMOTE_NAME="gdrive"
TARGET_DIR="" # Directly into root_folder_id configured in rclone.conf

echo "========================================================"
echo "🔄 TOEIC PRO Requirements -> Google Drive Sync"
echo "Target: Google Drive Folder ID [1ocddDyvyXd8fvRJdizPMa08MvJ9A64DS]"
echo "Time:   $(date)"
echo "========================================================"

# Verify rclone is installed
if ! command -v rclone &> /dev/null; then
    echo "❌ Error: rclone is not installed. Run 'brew install rclone' first."
    exit 1
fi

# Verify remote exists
if ! rclone listremotes | grep -q "^${REMOTE_NAME}:"; then
    echo "⚠️ Warning: Remote '${REMOTE_NAME}' is not yet authorized."
    echo "👉 Run 'rclone config create ${REMOTE_NAME} drive scope=drive' to link your Google Drive."
    exit 1
fi

cd "$ROOT_DIR"

# Filter list for requirement and design files
echo "📦 Transferring updated modular enterprise documentation (docs/)..."
rclone sync "$ROOT_DIR/docs" "${REMOTE_NAME}:docs" --update --verbose

echo "📦 Transferring root baseline specification files..."
rclone copy "$ROOT_DIR" "${REMOTE_NAME}:${TARGET_DIR}" \
    --include "SRS*" \
    --include "upd.pdf" \
    --include "*DESIGN*" \
    --include "UI-*" \
    --include "API-DOCUMENTATION.md" \
    --include "openapi.json" \
    --include "openapi.yaml" \
    --include "tests/API-TEST-CASES-SPECIFICATION.md" \
    --include "public/requirements_full.txt" \
    --include "public/srs_full.txt" \
    --include "public/upd_full.txt" \
    --update \
    --verbose

echo "✅ Sync completed successfully to Google Drive folder [1ocddDyvyXd8fvRJdizPMa08MvJ9A64DS]"


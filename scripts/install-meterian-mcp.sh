#!/usr/bin/env bash
#
# Install (or uninstall) the Meterian MCP server as a standalone binary.
# Downloads the latest .vsix from OpenVSX, extracts the MCP server files,
# smoke-tests the server, and registers it with available AI CLIs.
#
# Usage:
#   ./install-meterian-mcp.sh                        # install from OpenVSX (default)
#   ./install-meterian-mcp.sh --install              # install from OpenVSX (explicit)
#   ./install-meterian-mcp.sh --file <path.vsix>     # install from a local .vsix file
#   ./install-meterian-mcp.sh --uninstall            # remove everything
#
set -euo pipefail

INSTALL_DIR="$HOME/.meterian/mcp-server"
MCP_NAME="meterian-mcp"
ENTRY_POINT="src/mcp/server/entry.js"
OPENVSX_API="https://open-vsx.org/api/Meterian/meterian-heidi/latest"
SMOKE_TIMEOUT=5
LOCAL_VSIX=""

# ── Helpers ──────────────────────────────────────────────────────────────

info()  { printf '\033[1;34m[INFO]\033[0m  %s\n' "$*"; }
ok()    { printf '\033[1;32m[OK]\033[0m    %s\n' "$*"; }
warn()  { printf '\033[1;33m[WARN]\033[0m  %s\n' "$*"; }
fail()  { printf '\033[1;31m[FAIL]\033[0m  %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "'$1' is required but not found in PATH"
}

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

cleanup_temp() {
  if [ -n "${TMPDIR_CREATED:-}" ] && [ -d "$TMPDIR_CREATED" ]; then
    rm -rf "$TMPDIR_CREATED"
  fi
}

# ── Uninstall ────────────────────────────────────────────────────────────

do_uninstall() {
  if [ ! -d "$INSTALL_DIR" ]; then
    info "Meterian MCP server is not installed, nothing to do."
    return
  fi

  info "Uninstalling Meterian MCP server..."

  # Deregister from CLIs
  if has_cmd claude; then
    info "Removing from Claude Code..."
    claude mcp remove "$MCP_NAME" -s user >/dev/null 2>&1 && ok "Removed from Claude Code" || warn "Not registered in Claude Code (or removal failed)"
  fi

  if has_cmd gemini; then
    info "Removing from Gemini CLI..."
    gemini mcp remove "$MCP_NAME" --scope user >/dev/null 2>&1 && ok "Removed from Gemini CLI" || warn "Not registered in Gemini CLI (or removal failed)"
  fi

  if has_cmd codex; then
    info "Removing from Codex CLI..."
    codex mcp remove "$MCP_NAME" >/dev/null 2>&1 && ok "Removed from Codex CLI" || warn "Not registered in Codex CLI (or removal failed)"
  fi

  # Remove installed files
  rm -rf "$INSTALL_DIR"
  ok "Removed $INSTALL_DIR"

  ok "Uninstall complete."
}

# ── Install ──────────────────────────────────────────────────────────────

do_install() {
  info "Installing Meterian MCP server..."

  # 1. Preflight checks
  info "Checking prerequisites..."
  require_cmd node
  require_cmd unzip

  TMPDIR_CREATED=$(mktemp -d)
  trap cleanup_temp EXIT

  # 2. Obtain .vsix (local file or download from OpenVSX)
  if [ -n "$LOCAL_VSIX" ]; then
    [ -f "$LOCAL_VSIX" ] || fail "Local .vsix file not found: $LOCAL_VSIX"
    VSIX_PATH="$LOCAL_VSIX"
    VERSION="local"
    ok "Using local .vsix: $VSIX_PATH"
  else
    require_cmd curl

    info "Fetching latest version info from OpenVSX..."
    METADATA=$(curl -sSf "$OPENVSX_API") || fail "Failed to fetch metadata from OpenVSX"

    VSIX_URL=$(echo "$METADATA" | node -e "
      let data = '';
      process.stdin.on('data', c => data += c);
      process.stdin.on('end', () => {
        const meta = JSON.parse(data);
        const url = meta.files && meta.files.download;
        if (!url) { process.stderr.write('No download URL found in metadata'); process.exit(1); }
        process.stdout.write(url);
      });
    ") || fail "Failed to parse download URL from OpenVSX metadata"

    VERSION=$(echo "$METADATA" | node -e "
      let data = '';
      process.stdin.on('data', c => data += c);
      process.stdin.on('end', () => {
        const meta = JSON.parse(data);
        process.stdout.write(meta.version || 'unknown');
      });
    ")

    info "Downloading v${VERSION} from OpenVSX..."
    VSIX_PATH="$TMPDIR_CREATED/meterian-heidi.vsix"
    curl -sSfL "$VSIX_URL" -o "$VSIX_PATH" || fail "Failed to download .vsix"
    ok "Downloaded $(du -h "$VSIX_PATH" | cut -f1) vsix"
  fi

  # 3. Extract & copy
  info "Extracting..."
  EXTRACT_DIR="$TMPDIR_CREATED/extracted"
  unzip -q "$VSIX_PATH" -d "$EXTRACT_DIR" || fail "Failed to unzip .vsix"

  EXTENSION_DIR="$EXTRACT_DIR/extension"
  [ -d "$EXTENSION_DIR" ] || fail "Expected 'extension/' directory not found in .vsix"

  # Remove previous installation if present
  if [ -d "$INSTALL_DIR" ]; then
    info "Removing previous installation..."
    rm -rf "$INSTALL_DIR"
  fi

  mkdir -p "$INSTALL_DIR"

  # Copy the required files preserving directory structure
  # MCP server files
  mkdir -p "$INSTALL_DIR/src/mcp/server"
  cp -r "$EXTENSION_DIR/src/mcp/server/." "$INSTALL_DIR/src/mcp/server/"

  # Auth and API dependencies (required by entry.js via relative paths)
  mkdir -p "$INSTALL_DIR/src/meterian"
  cp "$EXTENSION_DIR/src/meterian/Auth.js" "$INSTALL_DIR/src/meterian/"
  cp "$EXTENSION_DIR/src/meterian/KiwiAPI.js" "$INSTALL_DIR/src/meterian/"
  cp "$EXTENSION_DIR/src/meterian/AccountsAPI.js" "$INSTALL_DIR/src/meterian/"

  # Pre-bundled node_modules
  cp -r "$EXTENSION_DIR/node_modules" "$INSTALL_DIR/"

  # package.json for module resolution
  cp "$EXTENSION_DIR/package.json" "$INSTALL_DIR/"

  ok "Installed to $INSTALL_DIR"

  # 4. Smoke test
  info "Running smoke test..."
  ENTRY="$INSTALL_DIR/$ENTRY_POINT"
  [ -f "$ENTRY" ] || fail "Entry point not found: $ENTRY"

  SMOKE_LOG="$TMPDIR_CREATED/smoke.log"
  node "$ENTRY" >"$SMOKE_LOG" 2>&1 &
  SERVER_PID=$!

  SMOKE_OK=false
  for i in $(seq 1 "$SMOKE_TIMEOUT"); do
    if grep -q "\[MCP SERVER\] ready" "$SMOKE_LOG" 2>/dev/null; then
      SMOKE_OK=true
      break
    fi
    # Check if server crashed early
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
      break
    fi
    sleep 1
  done

  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true

  if [ "$SMOKE_OK" = true ]; then
    ok "Smoke test passed - server boots correctly"
  else
    SMOKE_OUTPUT=$(cat "$SMOKE_LOG" 2>/dev/null || echo "(no output)")
    fail "Smoke test failed - server did not print '[MCP SERVER] ready' within ${SMOKE_TIMEOUT}s. Output: $SMOKE_OUTPUT"
  fi

  # 5. Register with available CLIs
  info "Registering with available AI CLIs..."
  REGISTERED=0

  if has_cmd claude; then
    info "Registering with Claude Code..."
    claude mcp remove "$MCP_NAME" -s user >/dev/null 2>&1 || true
    if claude mcp add "$MCP_NAME" -s user -- node "$ENTRY" >/dev/null 2>&1; then
      ok "Registered with Claude Code"
      REGISTERED=$((REGISTERED + 1))
    else
      warn "Failed to register with Claude Code"
    fi
  fi

  if has_cmd gemini; then
    info "Registering with Gemini CLI..."
    gemini mcp remove "$MCP_NAME" --scope user >/dev/null 2>&1 || true
    if gemini mcp add "$MCP_NAME" node "$ENTRY" --scope user >/dev/null 2>&1; then
      ok "Registered with Gemini CLI"
      REGISTERED=$((REGISTERED + 1))
    else
      warn "Failed to register with Gemini CLI"
    fi
  fi

  if has_cmd codex; then
    info "Registering with Codex CLI..."
    codex mcp remove "$MCP_NAME" >/dev/null 2>&1 || true
    if codex mcp add "$MCP_NAME" -- node "$ENTRY" >/dev/null 2>&1; then
      ok "Registered with Codex CLI"
      REGISTERED=$((REGISTERED + 1))
    else
      warn "Failed to register with Codex CLI"
    fi
  fi

  if [ "$REGISTERED" -eq 0 ]; then
    warn "No AI CLIs found (claude, gemini, codex). You can register manually later:"
    echo "  claude mcp add $MCP_NAME -s user -- node $ENTRY"
    echo "  gemini mcp add $MCP_NAME node $ENTRY --scope user"
    echo "  codex  mcp add $MCP_NAME -- node $ENTRY"
  fi

  # 6. Summary
  echo ""
  ok "Meterian MCP server v${VERSION} installed successfully!"
  echo ""
  echo "  Install location: $INSTALL_DIR"
  echo "  Entry point:      $ENTRY"
  echo "  CLIs registered:  $REGISTERED"
  echo ""
  echo "  To run manually:  node $ENTRY"
  echo "  To uninstall:     $0 --uninstall"
}

# ── Main ─────────────────────────────────────────────────────────────────

ACTION="install"

while [ $# -gt 0 ]; do
  case "$1" in
    --uninstall)
      ACTION="uninstall"
      shift
      ;;
    --install)
      ACTION="install"
      shift
      ;;
    --file)
      [ -n "${2:-}" ] || fail "--file requires a path argument"
      LOCAL_VSIX="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--install | --uninstall] [--file <path.vsix>]"
      exit 1
      ;;
  esac
done

case "$ACTION" in
  uninstall) do_uninstall ;;
  install)   do_install ;;
esac

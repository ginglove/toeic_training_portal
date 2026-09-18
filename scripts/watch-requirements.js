const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const SYNC_SCRIPT = path.join(__dirname, 'sync-requirements-drive.sh');

// Match requirement, specification, design, and API documentation files
function isTargetFile(filename) {
  if (!filename) return false;
  return (
    filename.startsWith('SRS') ||
    filename.includes('DESIGN') ||
    filename.startsWith('UI-') ||
    filename === 'API-DOCUMENTATION.md' ||
    filename === 'openapi.json' ||
    filename === 'openapi.yaml' ||
    filename === 'upd.pdf' ||
    filename.endsWith('_full.txt') ||
    filename === 'API-TEST-CASES-SPECIFICATION.md'
  );
}

let syncTimeout = null;
function triggerSync(filename) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    console.log(`\n🔔 Detected update in requirement file: [${filename}]`);
    console.log(`🚀 Triggering Google Drive sync...`);
    exec(`bash "${SYNC_SCRIPT}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Sync error:`, stderr || error.message);
      } else {
        console.log(stdout.trim());
      }
    });
  }, 1500);
}

console.log('👀 Watching TOEIC PRO requirement & design files for changes...');
console.log('Target Google Drive Folder ID: 1ocddDyvyXd8fvRJdizPMa08MvJ9A64DS\n');


// Watch root directory
fs.watch(ROOT_DIR, (eventType, filename) => {
  if (isTargetFile(filename)) {
    triggerSync(filename);
  }
});

// Watch public directory
const publicDir = path.join(ROOT_DIR, 'public');
if (fs.existsSync(publicDir)) {
  fs.watch(publicDir, (eventType, filename) => {
    if (isTargetFile(filename)) {
      triggerSync(`public/${filename}`);
    }
  });
}

// Watch docs directory recursively
const docsDir = path.join(ROOT_DIR, 'docs');
if (fs.existsSync(docsDir)) {
  fs.watch(docsDir, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.md') || filename.endsWith('.json') || filename.endsWith('.yaml'))) {
      triggerSync(`docs/${filename}`);
    }
  });
}

